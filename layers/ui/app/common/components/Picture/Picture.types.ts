import type { ImgProps } from '../Img/Img.vue'

export interface PictureSrcSetItem {
	/** URL изображения для данного media-условия. */
	src: string
	/** Тип media-условия: `min-width` или `max-width`. */
	type: 'min' | 'max'
	/** Пороговая ширина viewport в пикселях */
	width: number
}

export interface PictureProps {
	/** Массив данных для `<source>`. */
	srcSet: PictureSrcSetItem[]
	/** Альтернативный текст fallback-изображения. Для декоративных изображений передайте пустую строку. */
	alt: string
	/** URL основного изображения, он же и fallback, если ни один `<source>` не подошёл. Если не передан,
	 * то будет использваться `PictureSrcSetItem[0].src`  */
	src?: string
	/** Дополнительные опции, передаваемые в изображение. */
	imageOptions?: Omit<ImgProps, 'src' | 'alt'>
}
