import React from 'react'
import { Gallery, GalleryImage } from 'react-gesture-gallery'


const images = [
        "https://image.noelshack.com/fichiers/2019/39/2/1569331631-210t.png",
        "https://image.noelshack.com/fichiers/2019/39/2/1569332168-2019-09-24-152518.png",
        "https://image.noelshack.com/fichiers/2019/39/2/1569331637-215t.png",
        "https://image.noelshack.com/fichiers/2019/39/2/1569332175-2019-09-24-152529.png",
        "https://image.noelshack.com/fichiers/2019/39/2/1569331642-250t.png",
        "https://image.noelshack.com/fichiers/2019/39/2/1569332180-2019-09-24-152542.png",
        "https://image.noelshack.com/fichiers/2019/39/2/1569331647-270t.png",
        "https://image.noelshack.com/fichiers/2019/39/2/1569332184-chargeur-sur-chenilles.png",
];
const INITIAL_INDEX = 0

function Landing() {

    const [index, setIndex] = React.useState(INITIAL_INDEX)

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (index === images.length - 1) {
                setIndex(INITIAL_INDEX)
             } else {
                setIndex(index +1)
             }
        }, 2500)
        return () => clearInterval (interval)
    }, [index])

            return (
            <div>
                <Gallery
                    style={{
                        height: '50vh',
                        width: '50vw',
                        background: 'blue',
                        margin: '0 auto'
                    }}
                    index={index}
                    onRequestChange={i => {
                        setIndex(i);
                    }}
                >

                     {images.map(image => (
                            <GalleryImage objectFit="contain" src={image} key={images}/>
                      ))}
                </Gallery>
            </div>
            )
}
export default Landing