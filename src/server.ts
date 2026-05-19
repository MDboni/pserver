import app from "./app"
import config from "./config"
import { DB } from "./db"


const main = ()=>{
    DB()
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    }
 )
}

main()
