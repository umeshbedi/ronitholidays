import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

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

const boxShadow = '0 0 30px 0 rgba(0, 0, 0, 0.1)'

export function MinusPlus({text, number, pluOnPress, minusOnPress, subText}) {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
            <p>{text}</p>
            <p style={{fontSize:14}}>{subText}</p>
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
                <PlusOutlined style={{ marginLeft: 10, cursor: 'pointer' }} onClick={pluOnPress}/>
            </div>
        </div>
    )
}
