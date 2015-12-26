<?php $title='jQuery'; $css='<link rel="stylesheet" type="text/css" href="../../base/css/eden-gallery-lightbox.css"><link rel="stylesheet" type="text/css" href="../../base/css/plugin-site.css">'; include(__DIR__ . '/../../base/header.php'); ?>
 <h1 class='main-title'>Eden Gallery Lightbox Plugin</h1>
 <p class='description'>Ett enkelt mini-plugin för att visa bilder</p>

 		<div class='gallery'>
			<img src="../../base/img/lightbox1.jpg" alt='Vacker bild' class='gallery-image'>
			<img src="../../base/img/lightbox2.jpg" alt='Vacker bild' class='gallery-image'>
			<img src="../../base/img/lightbox3.jpg" alt='Vacker bild' class='gallery-image'>
			<img src="../../base/img/lightbox4.jpg" alt='Vacker bild' class='gallery-image'>
		</div>	
<div class='information'>
	<h2>Beskrivning</h2>
		<p>Eden Gallery Lightbox är ett litet plugin till jQuery som kombinerar ett vanligt bildgalleri med lightbox-funktionalitet. Klickar man på en thumbnail får man se bilden något förstorad
			och klickar man på den valda bilden får man upp den i lightbox för att se den i full storlek.</p>
</div>
<div class='information'>
	<h2>Kodexempel</h2>
		<p>För att använda pluginet behövs endast en &lt;div&gt; som omsluter de bilder som ska vara med i galleriet. Till exempel följande</p>
<pre>
	&lt;div class='my-gallery'&gt;
		&lt;img src='image1.jpg' alt='My image'&gt;
		&lt;img src='image2.jpg' alt='My image'&gt;
		&lt;img src='image3.jpg' alt='My image'&gt;
		&lt;img src='image4.jpg' alt='My image'&gt;
	&lt;&sol;div&gt;
</pre>
		<p>Därefter i din .js-fil anropar du metoden edenGallery(); på din gallery-div</p>
<pre>
	$('.my-gallery').edenGallery();
</pre>
</div>

<div class='information'>
	<h2>Github</h2>
		<p>Ladda ner <a href='https://github.com/aa222di/eden-gallery-lightbox' title='Länk till pluginet på Gitbub'>Eden Gallery Lightbox från Github</a></p>
</div>
 
<?php $path=__DIR__; include(__DIR__ . '/../../base/footer.php'); ?>