import React from 'react';



export default props => {

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
                <section className="downloads flex flex-row just-around">
                    <article className="flex flex-column align-stretch">
                        <h4>Windows - Latest Version</h4>
                        <i>windows 7 & 10</i>
                        <a href="https://github.com/FDT2k/bia-manager/releases/download/v0.0.29/bia-manager-electron-Setup-0.0.29.exe" className="btn btn--primary">TELECHARGER</a>
                        <a href="#/help/win"><i>aide pour l'installation</i></a>
                    </article>
                    <article className="flex flex-column align-stretch">
                        <h4>MAC - Latest Version</h4>
                        <i>macOS 10.11 min</i>
                        <a href="https://github.com/FDT2k/bia-manager/releases/download/v0.0.29/bia-manager-electron-0.0.29.dmg" className="btn btn--primary">TELECHARGER</a>
                        <a href="#/help/mac"><i>aide pour l'installation</i></a>


                    </article>


                </section>
                <section className="downloads flex flex-row just-around">
                    <article className="flex flex-column align-stretch">
                        <h4>Linux - Latest Version</h4>
                        <i>Any 64bits</i>

                        <a href="https://github.com/FDT2k/bia-manager/releases/download/v0.0.29/bia-manager-electron-0.0.29.AppImage" className="btn btn--primary">TELECHARGER</a>
                    </article>
                    <article className="flex flex-column align-stretch">
                        <h4>Version en ligne</h4>

                        <i>bientôt disponible</i>
                    </article>
                </section>
            </div>

            <footer>
                handcrafted with love & cocoa by <a target="_blank" href="https://www.karsegard.ch/">Karsegard Digital Agency</a>
            </footer>

        </>
    )
}