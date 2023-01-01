export default function Image(props) {
    const deviceSizes = props.deviceSizes ? [...props.deviceSizes] : ["desktop", "tablet", "mobile"];
    const mediaSizes = props.mediaSizes ? [...props.mediaSizes] : ["64em", "30em"];
    const formats = props.formats ? [...props.formats] : ["webp", "jpg"];

    function getSrcSet(index) {
        let srcSet = [];
        if (props.useMedia) {
            formats.forEach(format => {
                srcSet.push(`assets/images/${props.dir}/${deviceSizes[index]}/${props.name}.${format} ${props.widths[index]}w`);
            });
        } else {
            deviceSizes.forEach((size, index) => {
                formats.forEach(format => {
                    srcSet.push(`assets/images/${props.dir}/${size}/${props.name}.${format} ${props.widths[index]}w`);
                });
            });
        }
        return srcSet;
    }

    function getMedia(index) {
        if (props.mediaSizes === "none") return undefined;
        if (mediaSizes[index]) return `(width > ${mediaSizes[index]})`;
    }

    function renderSource() {
        if (props.useMedia) {
            return deviceSizes.map((size, index) => (
                <source
                    key={`key${index}`}
                    media={getMedia(index)}
                    srcSet={getSrcSet(index)}
                />
            ));
        } else {
            return (
                <source srcSet={getSrcSet()}/>
            );
        }
    }

    return (
        <picture className={props.utils ? props.utils : undefined}>
            {renderSource()}

            <img loading={props.lazy ? "lazy" : "eager"}
                 fetchpriority={props.fetchPriority ? props.fetchPriority : 'auto'}
                 width={props.width ? props.width : undefined}
                 height={props.height ? props.height : undefined}
                 aria-hidden={!props.alt}
                 alt={props.alt ? props.alt : undefined}
                 src={`./assets/images/${props.dir}/desktop/${props.name}.jpg`}
            />
        </picture>
    );
}