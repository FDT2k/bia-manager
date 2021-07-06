import React, { useState, useRef, useEffect } from 'react';
import './style.scss';

import useKeyPress from 'hooks/useKeypress';
import classNames from 'classnames';
/*
export default props => {
    const [input, setInput] = useState('');
    const [tags, setTags] = useState([]);
    const [isKeyReleased, setIsKeyReleased] = useState(false);
    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };
    const onKeyDown = (e) => {
        console.log('porout');
        const { key } = e;
        const trimmedInput = input.trim();

        if (key === ',' && trimmedInput.length && !tags.includes(trimmedInput)) {
            e.preventDefault();
            setTags(prevState => [...prevState, trimmedInput]);
            setInput('');
        }

        if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
            const tagsCopy = [...tags];
            const poppedTag = tagsCopy.pop();
            e.preventDefault();
            setTags(tagsCopy);
            setInput(poppedTag);
        }

        setIsKeyReleased(false);
    };

    const onKeyUp = () => {
        setIsKeyReleased(true);
    }
    const deleteTag = (index) => {
        setTags(prevState => prevState.filter((tag, i) => i !== index))
    }
    return (<div className="tag-input">
        {tags.map((tag, index) => (
            <div className="tag">
                {tag}
                <button onClick={() => deleteTag(index)}>x</button>
            </div>
        ))}
        <input
            value={input}
            placeholder="Enter a tag"
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onChange={onChange}
        />
    </div>)
}*/


const AutoComplete = props => {
    const { options, style, search, visible, handleSelect } = props;
    const up = useKeyPress("ArrowUp");
    const down = useKeyPress("ArrowDown");


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
                return (<div className={classNames(
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
    const { handleChange, tags: initialTags, fields, ...rest } = props;
    const backspacePressed = useKeyPress("Backspace");
    const enterPressed = useKeyPress("Enter");
    const escapePressed = useKeyPress("Escape");
    const ref = useRef();
    const [typedTag, setTypedTag] = useState("");
    const [tags, setTags] = useState(initialTags);
    const [autocomplete, showAutocomplete] = useState(false);
    const [field, setSelectedField] = useState('');

    const [inputBounds, setInputBounds] = useState({ top: 0, left: 0 });
    useEffect(() => {
        if (backspacePressed) {
            if (typedTag == "") {
                if (tags.length > 0) {
                    let tag = tags.pop();
                    setTags([...tags]);
                    setTypedTag(tag);
                    handleChange(tags);
                }
            }
            showAutocomplete(false);
        }
        if (enterPressed) {
            if (!autocomplete) {
                if (typedTag != "") {
                    setTags([...tags, typedTag]);
                    setTypedTag("");

                }
            } else {
                setTypedTag(field + ':')
                showAutocomplete(false);
            }
            handleChange(tags);

        }

        if (escapePressed) {
            showAutocomplete(false);
        }

    }, [backspacePressed, escapePressed, enterPressed]);
    useEffect(() => {
     //   console.log(fields,typedTag.slice(0, -1), fields.indexOf(typedTag.slice(0, -1)));
        if (typedTag == ':' || (typedTag.slice(-1) == ':' && fields.indexOf(typedTag.slice(0, -1)) ===-1)) {
            setInputBounds(ref.current.getBoundingClientRect());
            showAutocomplete(true);
        }
    }, [typedTag]);

    const deleteTag = (idx) => {
        setTags(prevState => prevState.filter((tag, i) => i !== idx))
    }


    return (
        <>
            <div className="tag-input" onClick={_ => ref.current.focus()} {...rest}>
                {tags.map((t, idx) => (
                    <div className="tag">{t}  <button onClick={_ => deleteTag(idx)}>x</button></div>
                ))}
                <input
                    ref={ref}
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
    handleChange: x => x
}

export default TagInput;
