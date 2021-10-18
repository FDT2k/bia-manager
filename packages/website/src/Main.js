import React, { useEffect, useState,useReducer } from 'react';
import axios from 'axios';


const assetReducer = (items) => {
    let win = items.find((item) => item.browser_download_url.endsWith('.exe'));
    let osx = items.find((item) => item.browser_download_url.endsWith('.dmg'));
    let lin = items.find((item) => item.browser_download_url.endsWith('.AppImage'));



    return {
        win: win? win.browser_download_url:'',
        osx: osx ? osx.browser_download_url: '',
        lin: lin ? lin.browser_download_url: ''
    }

}

const reducer = (state, { type, payload }) => {


    switch (type) {
        case 'fetch':
            const releases = payload.map(({ assets, body, name }) => {
                return {
                    assets, body, name
                }

            })
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
    const[loaded,setLoaded] = useState(false)
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
            <nav>
                <h4>BIM</h4>
            </nav>

            <div className="container">
                <header>
                    <h1>BIM</h1>
                    <h3>
                        Version Beta
                    </h3>
                    <p>La version actuelle peut être instable, veillez à toujours faire une sauvegarde de vos données.</p>

                </header>
                {loaded &&
                    <>
                        <section className="downloads flex flex-row just-around">
                            <article className="flex flex-column align-stretch">
                                <h4>Windows - Latest Version</h4>
                                <i>windows 7 & 10</i>
                                <a href={state.latest.assets.win} className="btn btn--primary">TELECHARGER v{state.latest.name}</a>
                                <a href="#/help/win"><i>aide pour l'installation</i></a>
                            </article>
                            <article className="flex flex-column align-stretch">
                                <h4>MAC - Latest Version</h4>
                                <i>macOS 10.11 minimum</i>
                                <a href={state.latest.assets.osx} className="btn btn--primary">TELECHARGER v{state.latest.name}</a>
                                <a href="#/help/mac"><i>aide pour l'installation</i></a>


                            </article>


                        </section>
                        <section className="downloads flex flex-row just-around">
                            <article className="flex flex-column align-stretch">
                                <h4>Linux - Latest Version</h4>
                                <i>Any 64bits</i>

                                <a href={state.latest.assets.lin} className="btn btn--primary">TELECHARGER v{state.latest.name}</a>
                            </article>
                            <article className="flex flex-column align-stretch">
                                <h4>Version en ligne</h4>

                                <i>bientôt disponible</i>
                            </article>
                        </section>
                    </>
                }
            </div>

            <footer>
                handcrafted with love & cocoa by <a target="_blank" href="https://www.karsegard.ch/">Karsegard Digital Agency</a>
            </footer>

        </>
    )
}