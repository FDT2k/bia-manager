import { select } from '@storybook/addon-knobs';


export const makeThemeSelect = (label = 'Theme', group = 'Main', defaultValue = 'theme-blue-light') => {
    const options = {
        'Hermed-Blue-Light': 'theme-blue-light',
        'Hermed-Pink-Light': 'theme-pink-light',
        'Gka-Dark': 'theme-dark',
        'Gka-Light': 'theme-light',
        'Gka-Dark-Orange': 'theme-dark_orange',
        'None': null
    };

    return select(label, options, defaultValue, group);
}