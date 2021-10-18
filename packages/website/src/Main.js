import React from 'react';



export default props => {

    return (

        <>
          <nav class="flex flex-row just-center">
            <section>
              <h4>BIM</h4>
            </section>
          </nav>

          <div className="container">
            <header>

              <h1>
                Version Beta
              </h1>
              <h4>
                La version actuelle peut être instable, veillez à toujours faire une sauvegarde de vos données.
              </h4>
            </header>

            <section className="downloads">
              <div class="flex flex-row just-between">

                <article className="flex flex-column align-stretch">
                  <h4>Windows - Latest Version</h4>
                  <i>Windows 7 & 10</i>
                  <a href="https://github.com/FDT2k/bia-manager/releases/download/v0.0.29/bia-manager-electron-Setup-0.0.29.exe" className="btn btn--primary">TELECHARGER</a>
                  <span>
                    <a class="link" href="#/help/win">Aide pour l'installation</a>
                  </span>
                </article>

                <article className="flex flex-column ">
                  <h4>MAC - Latest Version</h4>
                  <i>MacOS 10.11 min</i>
                  <a href="https://github.com/FDT2k/bia-manager/releases/download/v0.0.29/bia-manager-electron-0.0.29.dmg" className="btn btn--primary">TELECHARGER</a>
                  <span>
                    <a class="link" href="#/help/mac">Aide pour l'installation</a>
                  </span>
                </article>

              </div>

              <div class="flex flex-row just-between">

                <article className="flex flex-column align-stretch">
                  <h4>Linux - Latest Version</h4>
                  <i>Any 64bits</i>
                  <a href="https://github.com/FDT2k/bia-manager/releases/download/v0.0.29/bia-manager-electron-0.0.29.AppImage" className="btn btn--primary">TELECHARGER</a>
                </article>

                <article className="flex flex-column align-stretch">
                  <h4>Version en ligne</h4>
                  <i>bientôt disponible</i>
                </article>

              </div>
            </section>

          </div>

          <footer>
            handcrafted with love & cocoa by <a class="link" target="_blank" href="https://www.karsegard.ch/">Karsegard Digital Agency</a>
          </footer>

        </>
    )
}
