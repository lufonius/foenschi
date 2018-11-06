pipeline {
    agent any
    stages {
       stage('Build and Release') {
            steps {
                sh '''
                    nvm use 8.11.2
                    ng build --prod
                    firebase deploy --only hosting
                '''
            }
       }
    }
}
