import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';


const assetReducer = (items) => {
  let win = items.find((item) => item.browser_download_url.endsWith('.exe'));
  let osx = items.find((item) => item.browser_download_url.endsWith('.dmg'));
  let lin = items.find((item) => item.browser_download_url.endsWith('.AppImage'));



  return {
    win: win ? win.browser_download_url : '',
    osx: osx ? osx.browser_download_url : '',
    lin: lin ? lin.browser_download_url : ''
  }

}

const reducer = (state, { type, payload }) => {


  switch (type) {
    case 'fetch':
      const releases = payload.map(({ assets, body, name }) => {
        return {
          assets, body, name
        }

      });
      console.log(releases);
      
      return {
        releases,
        latest: {
          ...releases[0],
          assets: assetReducer(releases[0].assets)
        }
      }
      break;

    default:
      throw new Error('error')
  }
}

export default props => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    axios.get('https://api.github.com/repos/fdt2k/bia-manager/releases').then(res => {
      dispatch({ type: 'fetch', payload: res.data })
      setLoaded(true)
    })
  }, [])

  const [state, dispatch] = useReducer(reducer, [])
  console.log(state)
  return (
    <>
      {/* <nav className="flex flex-row just-center">
        <section>
          <h4>BIM - BIA Manager</h4>
        </section>
      </nav> */}


      <div className="container">
        
        {loaded &&
          <>
            <section className="downloads flex flex-row just-between wrap">
              <article className="flex flex-column align-stretch grow-1 shrink-0">
                <h3>Windows</h3>
                <i>windows 7, 10 & 11 (64 bits)</i>
                <a href={state.latest.assets.win} className="btn btn--primary">TELECHARGER v{state.latest.name}</a>
                <span>
                  <a class="link" href="#/help/win">Aide pour l'installation</a>
                </span>
              </article>
              <article className="flex flex-column align-stretch grow-1 shrink-0">
                <h3>MAC</h3>
                <i>macOS 10.11 minimum</i>
                <a href={state.latest.assets.osx} className="btn btn--primary">TELECHARGER v{state.latest.name}</a>
                <span>
                  <a class="link" href="#/help/mac">Aide pour l'installation</a>
                </span>
              </article>
              <article className="flex flex-column align-stretch grow-1 shrink-0">
                <h3>Linux</h3>
                <i>Any 64bits</i>

                <a href={state.latest.assets.lin} className="btn btn--primary">TELECHARGER v{state.latest.name}</a>
              </article>
            </section>
            {/* <section className="downloads flex flex-row just-between wrap">
              <article className="flex flex-column align-stretch grow-1 shrink-0">
                <h3>Version en ligne</h3>

                <i>bientôt disponible</i>
              </article>
            </section> */}
            <section className="downloads flex flex-row just-between wrap">
              <article className="flex flex-column align-stretch grow-1 shrink-0">
                <h3>Code source</h3>
                <span>
                  <a href="https://www.gitlab.com/karsegard/bia-manager" className="link">GitLab</a>
                </span>
              </article>
             
            </section>
          </>
        }
      </div>

      {/* <footer>
        handcrafted with love & cocoa by <a target="_blank" href="https://www.karsegard.ch/">Karsegard Digital Agency</a>
      </footer> */}

    </>
  )
}
