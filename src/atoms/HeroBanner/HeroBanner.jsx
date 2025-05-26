
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';

 const HeroBanner = () => {
    const [products, setProducts] = useState([]);
    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    useEffect(() => {
        fetch('https://xuoapi.azurewebsites.net/api/v1/news/random')
            .then(response => response.json())
            .then(data => {
                setProducts(data.news); 
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const bannerTemplate = (product) => {
        return (
            <div style={{height: "400px", position: "relative"}}className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="mb-3">
                    <img  style={{width: "100%", height: "100%"}} src={`${product.image}`} alt={product.title} />
                </div>
                <div style={{position: "absolute", bottom: "50px", left: "50px", color: "white"}}>
                    <h2 style={{fontSize: "44px", marginBottom: "10px"}}>{product.title}</h2>
                
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-search" className="p-button p-button-rounded" label='Ver +' />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <Carousel value={products} numVisible={1} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel" circular
            autoplayInterval={10000} itemTemplate={bannerTemplate} />
        </div>
    )
}

export default HeroBanner;
        