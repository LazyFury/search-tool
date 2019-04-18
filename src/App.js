import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import 'font-awesome/scss/font-awesome.scss';
import 'react-fontawesome';
import cookies from 'react-cookies'

class App extends Component {

  constructor(){
    super()
    this.state={
      keyword:"",
      curtent:0,
      search:[
        {
          'name':"Google",
          'link':"https://www.google.com/search?q=",
          'logo':undefined,
          'color':"#1A73E8"
        },
        {
          'name':"Bing",
          'link':"https://cn.bing.com/search?q=",
          'logo':undefined,
          'color':"#4e4e4e"
        },
        {
          'name':"Baidu",
          'link':"https://baidu.com/s?wd=",
          'logo':undefined,
          'color':"#3385ff"
        },
        {
          'name':"Sogou",
          'link':"https://www.sogou.com/web?query=",
          'logo':undefined,
          'color':"#fd6853"
        },
        {
          'name':"360",
          'link':"https://www.so.com/s?ie=utf-8&fr=none&src=360sou_newhome&q=",
          'logo':undefined,
          'color':"#19b955"
        },
        {
          'name':"Duck",
          'link':"https://duckduckgo.com/?q=",
          'logo':undefined,
          'color':"#5b9e4d"
        }
      ],
      rec:[
        {
          'name':"V2ex",
          'link':"https://www.v2ex.com/",
          'icon':"https://infinityicon.infinitynewtab.com/user-share-icon/cc9b4b985a4a2c7d034dc18bf21ea019.png?imageMogr2/thumbnail/260x/format/webp/blur/1x0/quality/100|imageslim"
        },
        {
          'name':"煎蛋网",
          'link':"http://jandan.net/",
          'icon':"https://infinityicon.infinitynewtab.com/user-share-icon/4ad2442aec3f169a2be7490852efca7d.png?imageMogr2/thumbnail/260x/format/webp/blur/1x0/quality/100|imageslim"
        },
        {
          'name':"掘金",
          'link':"https://juejin.im",
          'icon':"https://infinityicon.infinitynewtab.com/user-share-icon/534995dd434a6e0e39a4521a5fe04f8e.png?imageMogr2/thumbnail/260x/format/webp/blur/1x0/quality/100|imageslim"
        },
        {
          'name':"36kr",
          'link':"https://36kr.com/",
          'icon':"https://infinityicon.infinitynewtab.com/user-share-icon/837f8d4f276d80bc98900cc6b2e7e2fa.png?imageMogr2/thumbnail/260x/format/webp/blur/1x0/quality/100|imageslim"
        }
      ]
    }
  }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    this.setState({
      curtent:Number(cookies.load('curtent')) || 0
    })
    window.document.title='Search Tool'
  }

  handelInputChange(e){
    this.setState(
      {
        keyword:e.target.value
      }
    )
  }

  search(){
    if(this.state.keyword==="") return false;
    window.open(this.state.search[this.state.curtent].link+this.state.keyword);
    this.setState({
      keyword:''
    })
  }
  inputKeyPress(e){
    if(e.keyCode !== 13) return false;
    this.search()
  }
  open(url){
    window.open(url);
  }

  change_curtent(index){
    this.setState({
      curtent:index
    },()=>{
      cookies.save('curtent',index)
    })
  }

  render() {
    return (
      <div className="App" style={{
        '--first-color':`${this.state.search[this.state.curtent].color||"#d33"}`
      }}>
        <div className='header-bg'></div>
        <header className="App-header">
          <h1>{this.state.search[this.state.curtent].name||"Logo"}</h1>
        </header>
        <div className='search-box'>
            <ul>
              {this.state.search && this.state.search.map((x,index)=>{
                return(
                  <li key={'search'+index} className={`search-tab-item ${this.state.curtent===index?"active":""}`} onClick={this.change_curtent.bind(this,index)}>
                  {x.logo && <i className={`fa fa-${x.logo}`}></i>}
                    {x.name}
                  </li>
                )
              })}
            </ul>
            <div className='search_from'>
              <input 
                  onKeyUp={this.inputKeyPress.bind(this)}
                  onChange={this.handelInputChange.bind(this)}
                  placeholder='Dress keywords...'
                  value={this.state.keyword}></input>
              <button onClick={this.search.bind(this)}><i className="fa fa-search" aria-hidden="true"></i></button>
            </div>

        </div>

        
        <div className='rec'>
              {this.state.rec && this.state.rec.map((x,index)=>{
                return(
                  <div key={`rec-item`+index}>
                    <button onClick={this.open.bind(this,x.link)} target='_blank'  rel="noopener noreferrer" >
                      <img src={x.icon} alt=''></img>
                      <span>{x.name}</span>
                    </button>
                  </div>
                )
              })}
            </div>

        <div className='footer'>
             &copy; PowerBy suke  <a href='//www.abadboy.cn' target='_blank' rel="noopener noreferrer">www.abadboy.cn</a>
        </div>
      </div>
    );
  }
}

export default App;
