import React from 'react';



import win1 from './images/win-1.png'
import win2 from './images/win-2.png'
import osCs2 from './images/osx-catalina-step2-fr.png'
import osCs3 from './images/osx-catalina-step3-fr.png'
// import osx3 from './images/osx-3.png'
import osxSs1 from './images/osx-sonoma-step1-fr.png'
import osxSs2 from './images/osx-sonoma-step2-fr.png'
import osxSs3 from './images/osx-sonoma-step3-fr.png'

console.log(osCs3)
export default props => {
    const {params} = props;

    const {os} = params;
    return (

        <div className="container">

            <header>
                <h1>Aide</h1>

            </header>

            {os==="win" &&<section className="steps">
                <header>
                    <h2>Windows</h2>
                </header>
                <article className="flex flex-row just-between align-center">
                    <img src={win1} alt="Première étape de téléchargement" />
                    <p>
                        Une fois téléchargé, le logiciel peut indiquer qu'il n'est pas signé. Vous pouvez cliquer sur "informations complémentaires". 
                    </p>
                </article>
                <article className="flex flex-row just-between align-center">
                    <img src={win2} alt="Deuxième étape de téléchargement" />
                    <p>
                        Le bouton "Executer quand même" apparait et vous pouvez le cliquer pour lancer BIA Manager
                    </p>
                </article>
            </section>}
            {os==="mac" &&<section className="steps">
                <section>
                    <header>
                        <h2>Mac OS</h2>
                    </header>
 
                    <article className="flex flex-row just-between align-center">
                        <img src={osxSs1} alt="Première étape de téléchargement" />
                        <p>
                        Une fois téléchargé, faites glisser l'application "BIA-Manager" dans le dossier "Applications".
                        </p>
                    </article>

                    <article className="flex flex-row just-between align-center">
                        <img src={osxSs2} alt="Deuxième étape de téléchargement" />
                        <p>
                        Le logiciel peut indiquer qu'il n'est pas signé. Vous pouvez cliquer sur OK et vous rendres dans les paramêtres de votre mac et cliquer sur l'icone sécurité

                        </p>
                    </article>
                    
                    <article className="flex flex-row just-between align-center">
                        <img src={osxSs3} alt="Troisième étape de téléchargement" />
                        <p>
                        En bas de cette fenêtre vous aurez un texte vous indiquant la dernière application ayant tenté de s'ouvrir, vous pouvez cliquer sur "ouvrir quand même".
                        </p>
                    </article>
                    </section>
                <section>
                    <header>
                        <h2>Mac OS - Ancienne méthode</h2>
                    </header>
                    <article className="flex flex-row just-between align-center">
                        <img src={osxSs1} alt="Première étape de téléchargement" />
                        <p>
                        Une fois téléchargé, faites glisser l'application "BIA-Manager" dans le dossier "Applications".
                        </p>
                    </article>
                    <article className="flex flex-row just-between align-center">
                        <img src={osCs2} alt="Deuxième étape de téléchargement" />
                        <p>
                        Le logiciel peut indiquer qu'il n'est pas signé. Vous pouvez cliquer sur OK et vous rendres dans les paramêtres de votre mac et cliquer sur l'icone sécurité

                        </p>
                    </article>
                    <article className="flex flex-row just-between align-center">
                        <img src={osCs3} alt="Troisième étape de téléchargement" />
                        <p>
                        En bas de cette fenêtre vous aurez un texte vous indiquant la dernière application ayant tenté de s'ouvrir, vous pouvez cliquer sur "ouvrir quand même".
                        </p>
                    </article>
                </section>
            </section>}
        </div>
    )
}