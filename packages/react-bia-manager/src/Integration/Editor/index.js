import React from 'react';
import {cEx} from '@karsegard/react-compose'

const MonComposant = ({children,...attributes}) => {
    return (
        <div {...attributes}>{children}</div>
    )
}

const VuePrincipale = ({children,...attributes}) => {
    return (
        <div {...attributes}>{children}</div>
    )
}

const Navigation = ({children,...attributes}) => {
    return (
        <nav className="nav navigation">
            <div className="nav__content">
                <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                </svg>
                <h4>Retour à la liste</h4>
            </div>
        </nav>
    )
}

const EditorContent = ({children,...attributes}) => {
    return (
        <div className="content">{children}</div>
    )
}

const MesureLi = ({children,...attributes}) => {
    return (
        <li className="flex-row no-wrap just-between align-center">
            {children}
            <svg className="MuiSvgIcon-root action-icon" focusable="false"
            viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
            </svg>
        </li>
    )
}

const Field = ({children,...attributes}) => {
    return (
        <div {...attributes}>
            {children}
        </div>
    )
}

const FieldLabel = ({children,...attributes}) => {
    return (
        <label className="field__label">{children}</label>
    )
}

const FieldSvg = ({children,...attributes}) => {
    return (
        <div {...attributes}></div>
    )
}

const FieldContent = ({children,...attributes}) => {
    return (
        <div className="field__field">
            <div {...attributes}>{children}</div>
        </div>
    )
}

const FieldTextarea = ({children,...attributes}) => {
    return (
        <div className="field__field">
            <textarea {...attributes}></textarea>
        </div>
    )
}

const FieldDatePicker = ({children,...attributes}) => {
    return (
        <div className="field__field">
            <div className="react-datepicker-wrapper">
                <div className="react-datepicker__input-container">
                    <div {...attributes}>{children}</div>
                </div>
            </div>
        </div>
    )
}

const Button = ({children,className,...attributes}) => {
    const classes = cEx(['button',className])
    return (
        <button className={classes} {...attributes}>{children}</button>
    )
}

const PatientHeader = ({children,...attributes}) => {

    return (
        <header className="header patient-header">
            <h2>Ellen Schultz</h2>
            {/* To fix : when wrapping "cancel" just-between for the extra line https://stackoverflow.com/questions/43441307/how-do-i-justify-contentflex-start-on-the-next-line-of-a-wrap */}
            <div className="flex flex-row wrap just-between patient-header__fieldset">
                {children}
            </div>
        </header>
    )
}

const LeftAside = ({children,...attributes}) => {
    return (
        <aside className="left-aside flex-column">
            {/* left-aside */}
            <h3>Mesures</h3>
            {children}

        </aside>
    )
}

const RightAside = ({children,...attributes}) => {
    return (
        <aside className="right-aside flex-column">
            {/* right-aside */}
            {children}
        </aside>
    )
}

const Comments = ({children,...attributes}) => {
    return (
        <section className="comments">
            {/* comments */}
            {children}
        </section>
    )
}


const Footer = ({children,...attributes}) => {
    return (
        <footer className="footer">
            <div className="footer__content">{children}</div>
        </footer>
    )
}

const Editor = ({children,...attributes}) => {
    return (
        <section className="editor">
            {/* tabs */}
            {children}
        </section>
    )
}

const Tabs = ({children,...attributes}) => {
    return (
        <div className="tabs">
        {/* tabs */}
          <div className="tabs__container">
              <input type="radio" id="radio-1" name="tabs" checked />
              <label className="tabs__tab" for="radio-1">BIA</label>
              <input type="radio" id="radio-2" name="tabs" />
              <label className="tabs__tab" for="radio-2">Force de serrement</label>
              <input type="radio" id="radio-3" name="tabs" />
              <label className="tabs__tab" for="radio-3">Récapitulatif</label>
              <span className="glider"></span>
          </div>
        </div>
    )
}





export default props => {

    return (
        <VuePrincipale id="root" className="main-container container">
            <Navigation />
            <EditorContent>
                <PatientHeader>
                    <Field className="field field--birthdate">
                        <FieldLabel>Date&nbsp;de&nbsp;naissance</FieldLabel>
                        <FieldDatePicker>13.06.1996</FieldDatePicker>
                    </Field>

                    <Field>
                        <FieldLabel>Âge</FieldLabel>
                        <FieldContent>25</FieldContent>
                    </Field>

                    <Field>
                        <FieldLabel>Sexe</FieldLabel>
                        <FieldContent>F</FieldContent>
                    </Field>

                    <Field>
                        <FieldLabel>Taille&nbsp;(cm)</FieldLabel>
                        <FieldContent>159.5</FieldContent>
                    </Field>

                    <Field>
                        <FieldLabel>Poids&nbsp;habituel&nbsp;(kg)</FieldLabel>
                        <FieldContent>53</FieldContent>
                    </Field>

                    <Field>
                        <FieldLabel>Groupe&nbsp;pathologique</FieldLabel>
                        <FieldContent>VENS2015</FieldContent>
                    </Field>

                    <Field>
                        <FieldLabel>Nombre&nbsp;de&nbsp;mesures</FieldLabel>
                        <FieldContent>4</FieldContent>
                    </Field>
                </PatientHeader>

                <LeftAside>
                    <Button className="button btn--secondary" type="button">nouveau</Button>
                    <ul className="flex-column">
                        <MesureLi>05.12.2015</MesureLi>
                        <MesureLi>05.12.2015</MesureLi>
                        <MesureLi>05.12.2015</MesureLi>
                        <MesureLi>05.12.2015</MesureLi>
                        <MesureLi>05.12.2015</MesureLi>
                    </ul>
                </LeftAside>

                <RightAside>
                    <Button className="button" type="button">enregistrer</Button>
                    <Button className="button btn--secondary" type="button">imprimer</Button>
                    <Field>
                        <FieldLabel>Examinateur</FieldLabel>
                        <FieldContent className="editable-field">Alain</FieldContent>
                    </Field>
                    <Field>
                        <FieldLabel>Bio-impédancemètre</FieldLabel>
                        <FieldContent className="editable-field">NUTRIGUARD</FieldContent>
                    </Field>
                    <Field>
                        <FieldLabel>
                            Poids Idéal (%)
                            <FieldSvg className="button__svg info"/>
                        </FieldLabel>
                        <FieldContent>58.3 (96.9%)</FieldContent>
                    </Field>
                    <Field>
                        <FieldLabel>
                            BMI Actuel
                            <FieldSvg className="button__svg info"/>
                        </FieldLabel>
                        <FieldContent>21.8</FieldContent>
                    </Field>
                    <Field>
                        <FieldLabel>BMI Reference</FieldLabel>
                        <FieldContent className="editable-field"></FieldContent>
                    </Field>
                </RightAside>

                <Comments>
                    <Field>
                        <FieldLabel>Commentaire</FieldLabel>
                        <FieldTextarea className="editable-field" placeholder="Votre remarque..."></FieldTextarea>
                    </Field>
                </Comments>

                <Editor>
                bloup
                </Editor>



            </EditorContent>


            <Footer>bia-manager: v1.0.0 - bia-electron: v0.0.50 - development</Footer>
        </VuePrincipale>
    )
}
