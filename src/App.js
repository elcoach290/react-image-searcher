import { useState } from "react"
import { Formik, Form, Field } from "formik"
import './header.css'
import './content.css'
import './article.css'

const App = () => {
  const [photos, setPhotos] = useState([])
  const open = (url) => window.open(url)
  console.log({photos})
  return (
    <div>
      <header>
        <Formik
          initialValues = {
            {
              search:''
            }
          }
          onSubmit={ async values => {
            console.log(values)
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=8&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID IbmeuIB3IfLe_L2ujmufnEh3j0X1Lm1WwliSnNe8Ms0'
              }
            })
            const data = await response.json();

            setPhotos(data.results);
          }}
        >
          <Form>
            <Field name="search" placeholder="Buscar..."/>
          </Form>
        </Formik>
      </header>
      <div className="container">
          <div className="center">
            {photos.map(photo=>{
              return(
              <article key={photo.id} onClick={()=>open(photo.links.html)}>
                <img src={photo.urls.regular} />
                <p>{[photo.description, photo.alt_description, ].join(' - ')}</p>
              </article>)
            })}
          </div>
      </div>
    </div>   
  )
}

export default App;
