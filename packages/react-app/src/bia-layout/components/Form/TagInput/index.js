import React, { useState, useRef, useEffect } from 'react';
import './style.scss';

import { useFocus, useKeypress } from '@karsegard/react-hooks';
import classNames from 'classnames';



const AutoComplete = props => {
    const { options, style, search, visible, handleSelect, handleHoldFocus } = props;

    const up = useKeypress("ArrowUp");
    const down = useKeypress("ArrowDown");


    const _handleHoldFocus = _ => {
        let keys = visible ? ['ArrowUp', 'ArrowDown'] : [];
        handleHoldFocus && handleHoldFocus(keys);
    }

    const [displayedOptions, setDisplayedOptions] = useState(options);
    const [selected, setSelected] = useState(0);



    useEffect(() => {
        if (visible) {
            if (up) {
                if (selected == 0) {
                    setSelected(displayedOptions.length - 1);
                } else {
                    setSelected(selected - 1);
                }
                handleSelect(displayedOptions[selected])
            }
            if (down) {
                if (selected == displayedOptions.length - 1) {
                    setSelected(0);
                } else {
                    setSelected(selected + 1);
                }

            }

        }
        _handleHoldFocus();
    }, [up, down, visible]);



    useEffect(() => {
        handleSelect(displayedOptions[selected])
    }, [selected])

    useEffect(() => {
        if (visible) {

        }
    }, [visible])

    return (
        <div style={style} className={classNames(['autocomplete', { 'autocomplete--visible': visible }])}>
            {displayedOptions.map((item, idx) => {
                return (<div key={idx} onClick={_ => setSelected(idx)} className={classNames(
                    ['autocomplete__item',
                        { 'autocomplete__item--selected': idx == selected }]
                )}>{item}</div>)
            })}

        </div>
    )
}

AutoComplete.defaultProps = {
    options: [],
    handleSelect: x => x
}

const TagInput = (props) => {
    const { handleChange, handleAddTag, tabIndex, handleRemoveTag, handleFocus: handleFocusChange, tags: initialTags, fields, ...rest } = props;

    const backspacePressed = useKeypress("Backspace");
    const enterPressed = useKeypress("Enter");
    const escapePressed = useKeypress("Escape");

    const ref = useRef();

    const [typedTag, setTypedTag] = useState("");
    const [tags, setTags] = useState(initialTags);
    const [autocomplete, showAutocomplete] = useState(false);
    const [field, setSelectedField] = useState('');
    const { hasFocus, handleFocus, handleBlur } = useFocus({ ref, focused: true });

    const [inputBounds, setInputBounds] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (hasFocus) {
            handleFocusChange(true);
            if (backspacePressed) {
                if (typedTag == "") {
                    if (tags.length > 0) {
                        let tag = tags.pop();
                        handleRemoveTag(tag);
                        setTags([...tags]);
                        setTypedTag(tag);
                        handleChange(tags);
                    }
                }
                showAutocomplete(false);
            }
            if (enterPressed) {
                let newTags = [...tags];
                if (!autocomplete) {
                    if (typedTag != "") {
                        newTags.push(typedTag)
                        setTags(newTags);
                        setTypedTag("");
                        handleAddTag(typedTag);

                    }
                } else {
                    setTypedTag(field + ':')
                    showAutocomplete(false);
                }
                handleChange(newTags);
            }

            if (escapePressed) {
                showAutocomplete(false);
            }
        } else {
            showAutocomplete(false);
            if (typedTag == ':') {
                setTypedTag("");
            }
            handleFocusChange(false);
        }

    }, [backspacePressed, escapePressed, enterPressed, hasFocus]);


    useEffect(() => {
        //   console.log(fields,typedTag.slice(0, -1), fields.indexOf(typedTag.slice(0, -1)));
        if (typedTag == ':' || (typedTag.slice(-1) == ':' && fields.indexOf(typedTag.slice(0, -1)) === -1)) {
            setInputBounds(ref.current.getBoundingClientRect());
            showAutocomplete(true);
        }
    }, [typedTag]);



    const deleteTag = (idx, tag) => {
        handleRemoveTag(tag);
        let newTags = tags.filter((tag, i) => i !== idx);
        setTags(newTags)
        handleChange(newTags);
    }


    return (
        <>
            <div className="tag-input" onClick={_ => ref.current.focus()} {...rest}>
                {tags.map((t, idx) => (
                    <div className="tag" key={idx}>{t}  <button onClick={_ => deleteTag(idx, t)}>x</button></div>
                ))}
                <input
                    ref={ref}
                    tabIndex={tabIndex}
                    type="text"
                    value={typedTag}
                    onChange={(e) => setTypedTag(e.target.value)}
                />
            </div>
            <AutoComplete style={{ left: inputBounds.left, top: inputBounds.top }} handleSelect={setSelectedField} visible={autocomplete} options={fields} />
        </>
    );
};

TagInput.defaultProps = {
    tags: [],
    handleChange: x => x,
    handleAddTag: x => x,
    handleRemoveTag: x => x,
    handleFocus: x => x
}

export default TagInput;
