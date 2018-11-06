pipeline {
    agent any
    stages {
       stage('Build and Release') {
            steps {
                sh '''
                    ng build --prod
                    firebase deploy --only hosting
                '''
            }
       }
    }
}
