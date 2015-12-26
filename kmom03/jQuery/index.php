<?php $title='jQuery'; $css='<link rel="stylesheet" type="text/css" href="../../base/css/jquery-gifts.css">'; include(__DIR__ . '/../../base/header.php'); ?>
 
<div id='flash' class='text-window'>
<h1 class='main-title'>Nine small wrapped gifts to get started with jQuery</h1>

<div id='box1' class='box'>
	<span class='minimize'>x</span>
	<div class='box-content'>
		<h2>1. Att välja ut element, hantera event och modifiera element</h2>
		<p>Detta första exempel låter dig klicka på paragrafer eller bilder och byta deras bakgrundfärg.</p>
		<img src="../../base/img/cute-kitten.png" alt='Söt liten katt' class='obj-right'>
		<p>Klicka på denna texten t.ex. eller på bilden för att byta färg på dem.</p>
		<p>Klicka på krysset uppe till vämster för att stänga rutan</p>


	</div>
</div>


<div id='box2' class='box'>
	<span class='minimize'>x</span>
	<div class='box-content'>
		<h2>2. Event propagering och att stoppa den</h2>
		<article>
		<img src="../../base/img/playful-kitten.png" alt='Söt liten katt' id='playfulCat' class='obj-left'>
		<p>I denna artikel ligger det tre paragrafer och två bilder på små katter</p>
		<p>Om man klickar var som helst i artikeln så byts bakgrundsfärgen ut. Klickarna man på den sömniga katten så roterar den. Klickar man på dne lekfulla katten så
			både roterar den, men den låter även artikelns event spelas ut.</p>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in sem eu lorem varius lacinia. In at imperdiet justo. In laoreet vitae tortor vitae auctor. Vestibulum sit amet feugiat turpis, ultrices finibus eros. Donec eu vehicula sem. Quisque quis quam id odio ultrices hendrerit et ac nisl. Maecenas at massa fermentum, euismod est sed, malesuada quam. Duis pretium consectetur malesuada. Aliquam dignissim bibendum hendrerit. Sed eu feugiat lacus. Aliquam erat volutpat. Quisque ut imperdiet arcu. Nam tincidunt a nisi ac varius. Nulla finibus neque elit, ac feugiat mauris sagittis non.</p>
		<img src="../../base/img/sleepy-kitten.png" alt='Söt liten katt' id='sleepyCat' class='obj-right'>
		</article>

	</div>
</div>


<div id='box3' class='box'>
	<span class='minimize'>x</span>
	<div class='box-content'>
		<h2>3. Lägga till och ta bort element</h2>
		<p>I detta exempel får du skapa din egna färgpalett. Blir du inte nöjd är dte bara att klicka på färgen så försvinner den från paletten</p>
		<form>
			<input type='color' value='#fd6769' id='colorPicker'>
			<input type='button' value='Lägg till färg' id='addColor'>
		</form>
		<div id='palette'>
		</div>

	</div>
</div>


<div id='box4' class='box'>
	<span class='minimize'>x</span>
	<div class='box-content'>
		<h2>4. Läsa och ändra storleken på ett element</h2>
		<p>Här har vi en bild på ännu en söt liten katt. Använd kontrollerna nedanför för att ändra kattens storlek, bredd och höjd.</p>
		<img src="../../base/img/happy-kitten.png" alt='Söt liten katt' id='happyCat' class='obj-right'>
		<form>
			<div class='button-group'><label>Bredd</label><input type='button' value='+' id='addWidth'><input type='button' value='-' id='removeWidth'></div>
			<div class='button-group'><label>Höjd</label><input type='button' value='+' id='addHeight'><input type='button' value='-' id='removeHeight'></div>
			<div class='show-dimensions'><span id='image-dimensions'></span></div>
		</form>
	</div>
</div>


<div id='box5' class='box'>
	<span class='minimize'>x</span>
	<div class='box-content'>
		<h2>5. Grundläggande animeringar</h2>
		<article>

		<p>Här testar vi lite olika animeringar med de tre katterna.</p>
		<p>Klicka på katternas namn för att få dem att visa dig sina konster.</p>
		<p><span id='cat1' class='cat-buttons'>Brun katt </span><span id='cat2' class='cat-buttons'>Grå katt </span><span id='cat3' class='cat-buttons'>Rosa katt </span></p>
		<img src="../../base/img/playful-kitten.png" alt='Söt liten katt' id='brownCat' class='obj-left'>
		<img src="../../base/img/sleepy-kitten.png" alt='Söt liten katt' id='disappearingCat' class='obj-left'>
		<img src="../../base/img/cute-kitten.png" alt='Söt liten katt' id='cuteCat' class='obj-left'>
		</article>
	</div>
</div>


<div id='box6' class='box'>
	<span class='minimize'>x</span>
	<div class='box-content'>
		<h2>6. En lightbox för att visa bilder</h2>
		<article>
		<p>Här testar vi att bygga en första version av lightbox.</p>
		<p>Klicka på bilden bredvid för att se den stor
		<img src="../../base/img/lightbox1.jpg" alt='Vacker bild' class='obj-right lightbox' width='200'></p>
		</article>
	</div>
</div>


<div id='box7' class='box'>
	<span class='minimize'>x</span>
	<div class='box-content'>
		<h2>7. Ett galleri av bilder</h2>
		<article>
		<p>Här testar vi att bygga en första version av ett bildgalleri.</p>
		<div class='image-gallery'>
			<img src="../../base/img/lightbox1.jpg" alt='Vacker bild' class='gallery-image'>
			<img src="../../base/img/lightbox2.jpg" alt='Vacker bild' class='gallery-image'>
			<img src="../../base/img/lightbox3.jpg" alt='Vacker bild' class='gallery-image'>
			<img src="../../base/img/lightbox4.jpg" alt='Vacker bild' class='gallery-image'>
		</div>	
		</article>
	</div>
</div>


<div id='box8' class='box'>
	<span class='minimize'>x</span>
	<div class='box-content'>
		<h2>8. En slideshow till framsidan</h2>
		<article>
		<p>Här testar vi att bygga en första version av en slideshow med fyra bilder.</p>
		<div class='slideshow'>
			<img src="../../base/img/lightbox1.jpg" alt='Vacker bild' class='gallery-image'>
			<img src="../../base/img/lightbox2.jpg" alt='Vacker bild' class='gallery-image'>
			<img src="../../base/img/lightbox3.jpg" alt='Vacker bild' class='gallery-image'>
			<img src="../../base/img/lightbox4.jpg" alt='Vacker bild' class='gallery-image'>
		</div>	
		</article>
	</div>
</div>


<div id='box9' class='box'>
	<span class='minimize'>x</span>
	<div class='box-content'>
		<h2>9. Ett lightbox galleri för att visa bilder</h2>
		<article>
		<p>Här testar jag att bygga mitt första jQuery plugin. En kombination av bildgalleriet och lightbox.</p>
		<p>Klicka på på de små bilderna för att se dem större eller klicka på den valda bilden för att se den i lightboxläge</p>
		<div class='image-gallery-nr2'>
			<img src="../../base/img/lightbox1.jpg" alt='Vacker bild' class='gallery-image'>
			<img src="../../base/img/lightbox2.jpg" alt='Vacker bild' class='gallery-image'>
			<img src="../../base/img/lightbox3.jpg" alt='Vacker bild' class='gallery-image'>
			<img src="../../base/img/lightbox4.jpg" alt='Vacker bild' class='gallery-image'>
		</div>	
		</article>
	</div>
</div>

</div>
 
<?php $path=__DIR__; include(__DIR__ . '/../../base/footer.php'); ?>