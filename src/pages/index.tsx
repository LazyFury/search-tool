import React, { useEffect, useState } from 'react';
import { request, useRequest } from 'umi';
import styles from './index.less';
interface engine {
  name: string;
  link: string;
  logo: string | undefined;
  color: string;
}
const search: engine[] = [
  {
    name: 'Bing',
    link: 'https://cn.bing.com/search?q=',
    logo: '',
    color: '#4e4e4e',
  },
  {
    name: 'Baidu',
    link: 'https://baidu.com/s?wd=',
    logo: '',
    color: '#3385ff',
  },
];
interface rec {
  name: string;
  link: string;
  icon: string;
}
const rec: rec[] = [
  {
    name: 'V2ex',
    link: 'https://www.v2ex.com/',
    icon:
      'https://infinityicon.infinitynewtab.com/user-share-icon/cc9b4b985a4a2c7d034dc18bf21ea019.png?imageMogr2/thumbnail/260x/format/webp/blur/1x0/quality/100|imageslim',
  },
  {
    name: '煎蛋网',
    link: 'http://jandan.net/',
    icon:
      'https://infinityicon.infinitynewtab.com/user-share-icon/4ad2442aec3f169a2be7490852efca7d.png?imageMogr2/thumbnail/260x/format/webp/blur/1x0/quality/100|imageslim',
  },
  {
    name: '掘金',
    link: 'https://juejin.im',
    icon:
      'https://infinityicon.infinitynewtab.com/user-share-icon/534995dd434a6e0e39a4521a5fe04f8e.png?imageMogr2/thumbnail/260x/format/webp/blur/1x0/quality/100|imageslim',
  },
  {
    name: '36kr',
    link: 'https://36kr.com/',
    icon:
      'https://infinityicon.infinitynewtab.com/user-share-icon/837f8d4f276d80bc98900cc6b2e7e2fa.png?imageMogr2/thumbnail/260x/format/webp/blur/1x0/quality/100|imageslim',
  },
  {
    name: 'treblex',
    link: 'https://treblex.github.io/',
    icon: '',
  },
];
export default () => {
  const [current, setCurrent] = useState(
    Number(window.localStorage.getItem('current_search') || 0),
  );
  const [_search, setSearch] = useState<engine[]>(search);
  const [_rec, setRec] = useState<rec[]>(rec);
  const [engine, setEngine] = useState<engine | undefined>(_search[0]);

  useEffect(() => {
    request('search.json', { method: 'get' }).then(res => {
      setSearch(res || search);
    });
    request('rec.json', { method: 'get' }).then(res => {
      setRec(res || rec);
    });
  }, []);

  useEffect(() => {
    let engine = _search[current];
    if (!engine) {
      engine = _search[0];
    }
    setEngine(engine);
  }, [current, _search]);
  return (
    <div
      className={styles.content}
      style={{ backgroundColor: engine?.color || '#444' }}
    >
      <h1 className={styles.title}>{engine?.name || 'Waiting'}</h1>

      <div className={styles.search_box}>
        <SearchEngine
          list={_search}
          engine={engine}
          callback={i => {
            setCurrent(i);
            window.localStorage.setItem('current_search', String(i));
          }}
        />
        <SearchForm
          engine={engine}
          callback={k => {
            window.open(engine?.link + k);
          }}
        />
      </div>

      <div className={styles.rec}>
        <Rec list={_rec} />
      </div>
    </div>
  );
};

function Rec({ list }: { list: rec[] }) {
  return (
    <div className="row flex-wrap">
      {list.map(r => {
        return (
          <a
            href={r.link}
            target="_blank"
            key={r.link}
            className={`col ${styles.rec_icon}`}
          >
            <img
              src={r.icon || 'https://img.icons8.com/bubbles/2x/image.png'}
            />
            <span>{r.name}</span>
          </a>
        );
      })}
    </div>
  );
}

function SearchEngine(props: {
  list: Array<engine>;
  engine?: engine;
  callback: (i: number) => void;
}) {
  return (
    <div className="row flex-wrap">
      {props.list.map((e, i) => {
        return (
          <a
            key={e.link}
            className={styles.search_tab}
            style={{
              color: e.link == props.engine?.link ? e.color : '',
              flex: 1,
            }}
            onClick={() => props.callback(i)}
          >
            {e.name}
          </a>
        );
      })}
    </div>
  );
}

function SearchForm({
  callback,
  engine,
}: {
  callback: (k: string) => void;
  engine?: engine;
}) {
  const [keyword, setKey] = useState('');
  const search = (e: React.FormEvent<HTMLFormElement>) => {
    if (keyword) {
      callback(keyword);
    }
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={search} className={`row ${styles.search_form}`}>
        <input
          value={keyword}
          title="搜索关键词"
          required
          onChange={e => {
            setKey(e.target.value);
          }}
          placeholder="请输入搜索关键词..."
        />
        {keyword && (
          <div>
            <a
              title="清除搜索关键词"
              className={styles.search_form_clear}
              onClick={() => setKey('')}
              style={{ color: engine?.color }}
            >
              x
            </a>
          </div>
        )}
        <button
          title="提交搜索"
          className={styles.search_form_submit}
          type="submit"
          style={{ backgroundColor: engine?.color }}
        >
          搜索
        </button>
      </form>
    </div>
  );
}
