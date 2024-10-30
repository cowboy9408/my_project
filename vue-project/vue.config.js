
module.exports = {  
  outputDir: "../resources/static/vue/", // 빌드경로    
  publicPath: '/cabinetserver', // contextPath  "ip:port/admin/"  
  // publicPath: '/', // contextPath  "ip:port/admin/"  
  lintOnSave: false,
  
  pages: {
    index: {                    // 설정할 page의 name
        entry: 'src/main.js',   // 설정한 page의 entry 파일 위치
        template: 'public/index.html', // 기본 템플릿 파일
        filename: 'index.html',
        title: 'Cabinet Admin'
    }
  }
};