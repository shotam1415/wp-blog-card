<?php

/**
 * Plugin Name:       blog-card
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       blog-card
 *
 * @package CreateBlock
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_blog_card_block_init()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'create_block_blog_card_block_init');



//詳細ページの時、blog-card.cssを読み込む
function blog_card_style()
{
	if (is_single()) {
		wp_enqueue_style(
			'blog_card',
			plugins_url('build/index.css', __FILE__) . '?' . date('Ymd-Hi'),
			array(),
			null
		);
	}
}
add_action('wp_enqueue_scripts', 'blog_card_style');


/* ================================ *
   WP REST APIのオリジナルエンドポイント追加
 * ================================ */
function add_rest_original_endpoint()
{
	//エンドポイントを登録
	register_rest_route('wp/custom', '/meta/', array(
		'methods' => 'POST',
		//エンドポイントにアクセスした際に実行される関数
		'callback' => 'get_meta',
		'permission_callback' => function () {
			return true;
		}
	));
}
add_action('rest_api_init', 'add_rest_original_endpoint');

function get_meta($request)
{
	$args = json_decode($request->get_body(), true);
	$url = filter_var($args['url'], FILTER_VALIDATE_URL);

	if (!$url) {
		return new WP_Error('invalid_url', '無効なURLです', array('status' => 400));
	}

	$html = @file_get_contents($url);
	if ($html === false) {
		return new WP_Error('fetch_error', 'URLからデータを取得できませんでした', array('status' => 500));
	}

	$html = mb_convert_encoding($html, "utf-8", "auto");

	$doc = new DOMDocument();
	@$doc->loadHTML($html);
	$xpath = new DOMXPath($doc);

	$return = array();
	$metas = $xpath->query("//meta[@property='og:title' or @property='og:description' or @property='og:image']");
	foreach ($metas as $meta) {
		$property = $meta->getAttribute('property');
		$content = $meta->getAttribute('content');
		$return[str_replace('og:', '', $property)] = trim($content);
	}

	return new WP_REST_Response($return, 200);
}
