import React, {useRef} from 'react'
import ImageGallery from 'react-image-gallery'
import { ImageFooter, images } from '../variables'


export default function MainImage() {

    const allFullRef = useRef()

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <ImageGallery items={images}
                    ref={allFullRef}
                    lazyLoad={true}
                    showPlayButton={false}
                    useTranslate3D={true}
                    showThumbnails={false}
                    autoPlay={true}
                    onScreenChange={(e) => {
                        if (!e) {
                            console.log("ended")
                        }
                    }}

                />
                <ImageFooter
                    text={'View All Images'}
                    onPress={() => allFullRef.current.fullScreen()}
                />
            </div>
            <div style={{ width: '40%', marginLeft: '2%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div
                    style={{
                        height: '48%',
                        background: "url(" + images[0].original + ")",
                        backgroundSize: 'cover',
                        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
                    }}
                >
                    <ImageFooter
                        text={'Room Images'}
                        onPress={() => allFullRef.current.fullScreen()}
                    />
                </div>

                <div
                    style={{
                        height: '48%',
                        background: "url(" + images[2].original + ")",
                        backgroundSize: 'cover',
                        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
                    }}
                >
                    <ImageFooter
                        text={'Reception Images'}
                        onPress={() => allFullRef.current.fullScreen()}
                    />

                </div>

            </div>
            <div>

            </div>
        </div>
    )
}
