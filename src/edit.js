/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import "./editor.scss"

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, RangeControl, ColorPalette } from '@wordpress/components';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

export default function Edit({ attributes, setAttributes }) {
    const { backgroundColor, borderColor, borderWidth, borderRadius, newTab, url, title, description, og_image } = attributes;


    // ブロックロードのとき、fallbackCurrentYear がまだ設定されていなければ、
    // 現在の年に設定する

    const preventClick = (event) => {
        event.preventDefault();
    };

    const protocol = location.protocol;
    const host = location.host;
    const apiUrl = `${protocol}//${host}/wp-json/wp/custom/meta`;
    const fetchMeta = (newUrl) => {
        setAttributes({ url: newUrl || "" });
        //URLが無効の場合は処理を中断
        if (!newUrl || !URL.canParse(newUrl)) {
            return;
        }
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: newUrl }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('ネットワークエラーが発生しました');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                setAttributes({
                    title: data.title || "",
                    description: data.description || "",
                    og_image: data.image || "",
                });
            })
            .catch(error => {
                console.error('エラー:', error);
                alert('データの取得中にエラーが発生しました。');
            })

    };



    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Meta', 'blog-card')}>
                    <TextControl
                        label={__(
                            'URL',
                            'blog-card'
                        )}
                        value={url}
                        onChange={(value) => {
                            setAttributes({
                                url: value,
                            })
                            fetchMeta(value)
                        }
                        }
                    />
                    <TextControl
                        label={__(
                            'Title',
                            'blog-card'
                        )}
                        value={title}
                        onChange={(value) =>
                            setAttributes({
                                title: title,
                            })
                        }
                    />
                    <TextControl
                        label={__(
                            'Description',
                            'blog-card'
                        )}
                        value={description}
                        onChange={(value) =>
                            setAttributes({
                                description: description,
                            })
                        }
                    />
                    <TextControl
                        label={__(
                            'OG Image',
                            'blog-card'
                        )}
                        value={og_image}
                        onChange={(value) =>
                            setAttributes({
                                og_image: value,
                            })
                        }
                    />
                </PanelBody>
                <PanelBody title={__('Settings', 'blog-card')}>
                    <ToggleControl
                        checked={!!newTab}
                        label={__(
                            'Open in new tab',
                            'blog-card'
                        )}
                        onChange={() =>
                            setAttributes({
                                newTab: !newTab,
                            })
                        }
                    />
                </PanelBody>
                <PanelBody title={__('Styles', 'blog-card')}>
                    <ColorPalette
                        label={__('Background color', 'blog-card')}
                        colors={[
                            { name: 'テーマカラー', color: '#413d69' },
                            { name: 'ライトブルー', color: 'rgba(33, 150, 243, 0.5)' },
                            { name: 'ライトグリーン', color: 'rgba(76, 175, 80, 0.5)' },
                            { name: 'ライトイエロー', color: 'rgba(255, 235, 59, 0.5)' },
                            { name: 'ライトグレー', color: 'rgba(158, 158, 158, 0.5)' },
                            { name: 'ホワイト', color: '#fff' }
                        ]}
                        value={backgroundColor}
                        onChange={(color) => setAttributes({ backgroundColor: color })}
                    />
                    <ColorPalette
                        label={__('Border color', 'blog-card')}
                        colors={[
                            { name: 'テーマカラー', color: '#413d69' },
                            { name: 'ダークブルー', color: '#1A237E' },
                            { name: 'ダークグリーン', color: '#1B5E20' },
                            { name: 'ダークイエロー', color: '#F57F17' },
                            { name: 'ダークグレー', color: '#212121' },
                            { name: 'ブラック', color: '#000000' }
                        ]}
                        value={borderColor}
                        onChange={(color) => setAttributes({ borderColor: color })}
                    />
                    <RangeControl
                        label='Border width'
                        onChange={(number) => { setAttributes({ borderWidth: number }); }}
                        value={borderWidth}
                        min={0}
                    />
                    <RangeControl
                        label='Border radius'
                        onChange={(number) => { setAttributes({ borderRadius: number }); }}
                        value={borderRadius}
                        min={0}
                    />
                </PanelBody>

            </InspectorControls>
            <div {...useBlockProps()}>
                <a href={url || "/"} target={newTab ? '_blank' : '_self'} className='blogCard' onClick={preventClick} style={{ backgroundColor: backgroundColor, borderColor: borderColor, borderWidth: borderWidth + 'px', borderRadius: borderRadius + 'px' }}>
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
            </div>
        </>
    );
}
