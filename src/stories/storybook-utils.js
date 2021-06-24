import { withKnobs } from "@storybook/addon-knobs";
import {curry} from '@geekagency/composite-js'

export const makeTOC = curry((category,title)=>{
    return {
        title: `${category}/${title}`,
        decorators: [withKnobs],
        parameters: { notes: {}}
      };
});


export const Annotate = curry((annotation, toc) =>  {
    return {
        ...toc,
        parameters:{
            notes: {
                ...toc.parameters.notes,
                ...annotation
            }
        }   
    }
});

export const Components = makeTOC('Generic/Components');
export const Elements = makeTOC('Generic/Elements');
export const Containers = makeTOC('Generic/Containers');
export const Projects = makeTOC('Projects');



export { makeThemeSelect } from 'stories/theme-knobs'