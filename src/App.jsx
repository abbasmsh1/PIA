import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Home.jsx'
import {
  DestinationsPage,
  ServicesPage,
  FleetPage,
  HajjUmrahPage,
  ManagePage,
  AboutPage,
  NotFound,
} from './pages.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/hajj-umrah" element={<HajjUmrahPage />} />
          <Route path="/manage" element={<ManagePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
