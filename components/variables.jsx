import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";

export const cityName = [
  "Port Blair",
  "Havelock Island",
  "Neil Island",
  "Baratang Island",
  "Rangat",
  "Mayabunder",
  "Diglipur"
]

export const category = [
  "Budget",
  "Standard",
  "Premium",
  "Luxury"
]

export const ferry = [
  "Makruzz",
  "Nautika",
  "Sea Link",
  "Aashi",
  "Itt Majestic"
  ]

export function mobile() {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    if (width < 991) {
      return true
    } else {
      return false
    }
  }

}

export const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',

  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',

  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',

  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',

  },
];

export function ImageFooter({ text, onPress }) {
  return (
    <div
      style={{
        zIndex: 2,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,.6)',
        width: '',
        color: 'white',
        padding: '1%',
        righ: 0,
        cursor: 'pointer'
      }}
      onClick={onPress}
    >
      <p>{text}</p>
    </div>
  )
}

export const boxShadow = '0 0 30px 0 rgba(0, 0, 0, 0.3)'

export function MinusPlus({ text, number, pluOnPress, minusOnPress, subText }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        <p>{text}</p>
        <p style={{ fontSize: 14 }}>{subText}</p>
      </div>
      <div
        style={{
          marginLeft: 10,
          padding: '4% 6%',
          borderRadius: 20,
          boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.2)'
        }}
      >
        <MinusOutlined style={{ marginRight: 10, cursor: 'pointer' }} onClick={minusOnPress} />
        {number}
        <PlusOutlined style={{ marginLeft: 10, cursor: 'pointer' }} onClick={pluOnPress} />
      </div>
    </div>
  )
}

export function Wave({ color, rotation }) {

  const waves = `
<svg 
width="100%" 
height="100%" 
id="svg" 
viewBox="0 0 1440 140" 
xmlns="http://www.w3.org/2000/svg" 
class="transition duration-300 ease-in-out delay-150">

<style>
          .path-0{
            animation:pathAnim-0 5s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
          @keyframes pathAnim-0{
            0%{
              d: path("M 0,400 C 0,400 0,133 0,133 C 110.32142857142858,158.07142857142856 220.64285714285717,183.14285714285714 339,177 C 457.35714285714283,170.85714285714286 583.75,133.5 704,119 C 824.25,104.50000000000001 938.3571428571429,112.85714285714288 1060,119 C 1181.642857142857,125.14285714285712 1310.8214285714284,129.07142857142856 1440,133 C 1440,133 1440,400 1440,400 Z");
            }
            25%{
              d: path("M 0,400 C 0,400 0,133 0,133 C 141.28571428571428,120.5 282.57142857142856,108 408,118 C 533.4285714285714,128 642.9999999999999,160.5 748,172 C 853.0000000000001,183.5 953.4285714285713,174 1068,164 C 1182.5714285714287,154 1311.2857142857142,143.5 1440,133 C 1440,133 1440,400 1440,400 Z");
            }
            50%{
              d: path("M 0,400 C 0,400 0,133 0,133 C 150.96428571428572,113.85714285714286 301.92857142857144,94.71428571428571 425,106 C 548.0714285714286,117.28571428571429 643.2500000000001,158.99999999999997 759,167 C 874.7499999999999,175.00000000000003 1011.0714285714287,149.28571428571428 1128,138 C 1244.9285714285713,126.71428571428571 1342.4642857142858,129.85714285714286 1440,133 C 1440,133 1440,400 1440,400 Z");
            }
            75%{
              d: path("M 0,400 C 0,400 0,133 0,133 C 95.53571428571428,156.89285714285714 191.07142857142856,180.78571428571428 320,178 C 448.92857142857144,175.21428571428572 611.2499999999999,145.75 742,138 C 872.7500000000001,130.25 971.9285714285716,144.21428571428572 1083,147 C 1194.0714285714284,149.78571428571428 1317.0357142857142,141.39285714285714 1440,133 C 1440,133 1440,400 1440,400 Z");
            }
            100%{
              d: path("M 0,400 C 0,400 0,133 0,133 C 110.32142857142858,158.07142857142856 220.64285714285717,183.14285714285714 339,177 C 457.35714285714283,170.85714285714286 583.75,133.5 704,119 C 824.25,104.50000000000001 938.3571428571429,112.85714285714288 1060,119 C 1181.642857142857,125.14285714285712 1310.8214285714284,129.07142857142856 1440,133 C 1440,133 1440,400 1440,400 Z");
            }
          }</style>
          
          <path 
          d="M 0,400 C 0,400 0,133 0,133 C 110.32142857142858,158.07142857142856 220.64285714285717,183.14285714285714 339,177 C 457.35714285714283,170.85714285714286 583.75,133.5 704,119 C 824.25,104.50000000000001 938.3571428571429,112.85714285714288 1060,119 C 1181.642857142857,125.14285714285712 1310.8214285714284,129.07142857142856 1440,133 C 1440,133 1440,400 1440,400 Z" stroke="none" stroke-width="0" 
          fill="#235c90" fill-opacity="0.53" class="transition-all duration-300 ease-in-out delay-150 path-0" transform="rotate(-180 720 140)">
          </path>
          
          <style>
          .path-1{
            animation:pathAnim-1 6s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
          @keyframes pathAnim-1{
            0%{
              d: path("M 0,400 C 0,400 0,266 0,266 C 86.5,287.0357142857143 173,308.07142857142856 298,305 C 423,301.92857142857144 586.4999999999999,274.75000000000006 711,263 C 835.5000000000001,251.24999999999994 921,254.9285714285714 1036,258 C 1151,261.0714285714286 1295.5,263.53571428571433 1440,266 C 1440,266 1440,400 1440,400 Z");
            }
            25%{
              d: path("M 0,400 C 0,400 0,266 0,266 C 95.85714285714289,276.32142857142856 191.71428571428578,286.64285714285717 319,296 C 446.2857142857142,305.35714285714283 604.9999999999998,313.75 747,298 C 889.0000000000002,282.25 1014.2857142857144,242.35714285714286 1127,233 C 1239.7142857142856,223.64285714285714 1339.8571428571427,244.82142857142856 1440,266 C 1440,266 1440,400 1440,400 Z");
            }
            50%{
              d: path("M 0,400 C 0,400 0,266 0,266 C 153.46428571428572,268.5357142857143 306.92857142857144,271.07142857142856 424,274 C 541.0714285714286,276.92857142857144 621.7499999999999,280.25 740,278 C 858.2500000000001,275.75 1014.0714285714287,267.92857142857144 1137,265 C 1259.9285714285713,262.07142857142856 1349.9642857142858,264.0357142857143 1440,266 C 1440,266 1440,400 1440,400 Z");
            }
            75%{
              d: path("M 0,400 C 0,400 0,266 0,266 C 114.57142857142858,257.75 229.14285714285717,249.5 358,251 C 486.85714285714283,252.5 630,263.75 743,271 C 856,278.25 938.8571428571429,281.5 1050,280 C 1161.142857142857,278.5 1300.5714285714284,272.25 1440,266 C 1440,266 1440,400 1440,400 Z");
            }
            100%{
              d: path("M 0,400 C 0,400 0,266 0,266 C 86.5,287.0357142857143 173,308.07142857142856 298,305 C 423,301.92857142857144 586.4999999999999,274.75000000000006 711,263 C 835.5000000000001,251.24999999999994 921,254.9285714285714 1036,258 C 1151,261.0714285714286 1295.5,263.53571428571433 1440,266 C 1440,266 1440,400 1440,400 Z");
            }
          }</style>
          
          <path d="M 0,400 C 0,400 0,266 0,266 C 86.5,287.0357142857143 173,308.07142857142856 298,305 C 423,301.92857142857144 586.4999999999999,274.75000000000006 711,263 C 835.5000000000001,251.24999999999994 921,254.9285714285714 1036,258 C 1151,261.0714285714286 1295.5,263.53571428571433 1440,266 C 1440,266 1440,400 1440,400 Z" 
          stroke="none" stroke-width="0" 
          fill="rgb(241, 241, 241)" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-1" transform="rotate(-180 720 160)">
          </path>
          
          </svg>
          
`
  useEffect(() => {
    document.getElementById("waves").innerHTML = waves
  }, [])
  return (
    <div id='waves' />
  )
}



export const homepageImage = [
  "https://www.andamancab.in/uploads/sliders/53069.png",
  "https://www.andamancab.in/uploads/sliders/47665.png",
  "https://www.andamancab.in/uploads/sliders/27283.jpg",
  "https://www.andamancab.in/uploads/sliders/17768.png"
]

export const activity = [
  "Scuba Diving",
  "Kayaking",
  "Glass Bottom Boat",
  "Sea Walk",
  "Snorkeling",
  "Speed Boat Rides",
  "Parasailing",
  "Trekking",
  "Game Fishing",
  "Dinner Cruise"
]


export const IncludesIconName = [
  {name:"Breakfast", icon:"/icons/bREAKFAST.png"},
  {name:"Best Price", icon:"/icons/BEST PRICE.png"},
  {name:"Best Seller-2", icon:"/icons/BEST SELLER (2).png"},
  {name:"Best Seller", icon:"/icons/BEST SELLER.png"},
  {name:"Cab", icon:"/icons/CAB.png"},
  {name:"Candle Light Dinner", icon:"/icons/CANDLE LIGHT DINNER.png"},
  {name:"Co-ordinator", icon:"/icons/CORDINATOR.png"},
  {name:"Customer Happiness", icon:"/icons/CUSTOMER HAPPINESS.png"},
  {name:"Ferry", icon:"/icons/FERRY.png"},
  {name:"Hotel", icon:"/icons/HOTEL.png"},
  {name:"Jetski", icon:"/icons/JETSKI.png"},
  {name:"Local Expertys", icon:"/icons/LOCAL EXPERTYS.png"},
  {name:"No Hidden cost", icon:"/icons/NO HIDDEN COST.png"},
  {name:"ParaSailing", icon:"/icons/PARASAILING.png"},
  {name:"Scuba", icon:"/icons/SCUBA.png"},
  {name:"Sea Walk", icon:"/icons/SEA WALK dIVING.png"},
  {name:"Sight Seeing", icon:"/icons/SIGHTSEEING.png"},
  {name:"SnorKelling", icon:"/icons/SNORKELLING.png"},
  {name:"Tailor Made Packages", icon:"/icons/TAILOR MADE PACKAGES.png"},
  {name:"Water Sports", icon:"/icons/WATER SPORTS.png"},
  {name:"Accommodation", icon:"/icons/Accommodation Icon.png"},
  
]