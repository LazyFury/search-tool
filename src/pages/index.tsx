import React, { ElementRef, useEffect, useState } from 'react';
import styles from './index.less';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
interface engine {
  name: string;
  link: string;
  logo: string | undefined;
  color: string;
}
const search: engine[] = [
  {
    name: 'Google',
    link: 'https://www.google.com/search?q=',
    logo: undefined,
    color: '#1A73E8',
  },
  {
    name: 'Bing',
    link: 'https://cn.bing.com/search?q=',
    logo: undefined,
    color: '#4e4e4e',
  },
  {
    name: 'Baidu',
    link: 'https://baidu.com/s?wd=',
    logo: undefined,
    color: '#3385ff',
  },
  {
    name: 'Sogou',
    link: 'https://www.sogou.com/web?query=',
    logo: undefined,
    color: '#fd6853',
  },
  {
    name: '360',
    link: 'https://www.so.com/s?ie=utf-8&fr=none&src=360sou_newhome&q=',
    logo: undefined,
    color: '#19b955',
  },
  {
    name: 'Duck',
    link: 'https://duckduckgo.com/?q=',
    logo: undefined,
    color: '#5b9e4d',
  },
];

const rec = [
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
];
export default () => {
  const [current, setCurrent] = useState(
    Number(window.localStorage.getItem('current_search') || 0),
  );
  const [engine, setEngine] = useState<engine>(search[current]);

  useEffect(() => {
    setEngine(search[current]);
  }, [current]);
  return (
    <div className={styles.content} style={{ backgroundColor: engine.color }}>
      <h1 className={styles.title}>{engine.name}</h1>

      <div className={styles.search_box}>
        <SearchEngine
          list={search}
          current={current}
          callback={i => {
            setCurrent(i);
            window.localStorage.setItem('current_search', String(i));
          }}
        />
        <SearchForm
          engine={engine}
          callback={k => {
            window.open(engine.link + k);
          }}
        />
      </div>
    </div>
  );
};

function SearchEngine(props: {
  list: Array<engine>;
  current: number;
  callback: (i: number) => void;
}) {
  return (
    <div className="row flex-wrap">
      {props.list.map((e, i) => {
        return (
          <a
            key={e.link}
            className={styles.search_tab}
            style={{ color: i == props.current ? e.color : '' }}
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
  engine: engine;
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
              style={{ color: engine.color }}
            >
              <CloseCircleOutlined />
            </a>
          </div>
        )}
        <button
          title="提交搜索"
          className={styles.search_form_submit}
          type="submit"
          style={{ backgroundColor: engine.color }}
        >
          <SearchOutlined />
        </button>
      </form>
    </div>
  );
}
