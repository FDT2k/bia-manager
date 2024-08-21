
## First time clone



    you have to install git lfs before checking out 
    
    git submodule init
    git submodule update
    yarn install
    yarn run build:submodules



## Compiling
    you need node 16.15 to build this project

    some deps require make to be built.
    npm config set openssl_fips ''

    
## data recovery

sqlcipher bim-recovery.sqlite -cmd "pragma key=\"YOUR_KEY\"" .recover > bim-recovery.sql


## rebuild better-sqlite

in bettersqlite folder

yarn build-release

in main folder 

yarn compile