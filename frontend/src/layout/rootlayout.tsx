import Navigation from "@/layout/component/navigation"
import { Outlet } from "react-router-dom"
function RootLayout(){
    return(
        <div className='h-screen'>
          <div className="w-full h-16 border-2 border-gray-100"></div>
          <div className="flex flex-row h-full">
              <div className="basis-1/5">
                  <Navigation />
              </div>
              <div className="basis-3/5 bg-zinc-200">
                  <Outlet />
              </div>
              <div className="basis-1/5"></div>
          </div>
        </div>
    )
}
export default RootLayout
  