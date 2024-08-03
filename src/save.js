
export default function save({ attributes }) {
    const { borderColor, borderWidth, borderRadius, newTab, url, title, description, og_image } = attributes;

    return (
        <a href={url || "/"} target={newTab ? '_blank' : '_self'} className='blogCard' style={{ borderColor: borderColor, borderWidth: borderWidth + 'px', borderRadius: borderRadius + 'px' }}>
            <div className='blogCard__thumbnail'>
                <img className='' src={og_image} alt='' />
            </div>
            <dl className='blogCard__text'>
                <dt className='blogCard__text-title'>{title}</dt>
                <dd className='blogCard__text-description'>
                    {description}
                </dd>
            </dl>
        </a>

    );
}