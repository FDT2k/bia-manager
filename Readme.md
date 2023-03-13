

## First time clone

    
    you have to install git lfs before checking out 
    
    git submodule init
    git submodule update
    yarn install
    yarn run build:submodules



## Compiling

    some deps require make to be built.

    
## data recovery

sqlcipher bim-recovery.sqlite -cmd "pragma key=\"YOUR_KEY\"" .recover > bim-recovery.sql