export class Router {
    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }

    route(event) {
        event = event || window.event
        event.preventDefault()
    
        window.history.pushState({}, "", event.target.href)
    
        this.handle()

        switch (event.target.pathname) {
            case "/":
                document.documentElement.classList.remove('universe')
                document.documentElement.classList.remove('exploration')
                document.documentElement.classList.add('home')

                document.getElementById("app").classList.add('teste')
                
                break;
            case "/universe":
                document.documentElement.classList.remove('home')
                document.documentElement.classList.remove('exploration')
                document.documentElement.classList.add('universe')
                break;
            case "/exploration":
                document.documentElement.classList.remove('home')
                document.documentElement.classList.remove('universe')
                document.documentElement.classList.add('exploration')
                break;
            default:
                break;
        }
    }
    
    handle() {
        const { pathname } = window.location
        const route = this.routes[pathname] || this.routes[404]
    
        fetch(route)
        .then((data) => data.text())
        .then((html) => {
            document.querySelector("#app").innerHTML = html
        })
    }
}