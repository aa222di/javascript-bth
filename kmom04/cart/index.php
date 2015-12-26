<?php 
$title='Inloggning'; 
$css='<link rel="stylesheet" type="text/css" href="../../base/css/mall.css"><link rel="stylesheet" type="text/css" href="../../base/css/shop.css">';
include(__DIR__ . '/../../base/header.php');
include(__DIR__ . '/products.php'); ?>
 
<div id='flash' class='text-window'>
	<div class='shop'>
		<h1>The Sticker Shop</h1>
		
		<!-- PRODUCT TABLE -->
		<table id='products' class='product-table'>
			<thead>
				<tr><th>Sticker</th><th>Name</th><th>Price</th><th>Buy it</th></tr>
			</thead>	
			<tbody>
				
				<?php
				foreach ($products as $productId => $product) {
					extract($product);
					?>
					<tr>
						<td><img class='product-img' src='<?= $img?>' alt='<?= $name ?>'></td>
						<td><?= $name ?></td>
						<td><?= $price ?> €</td> 
						<td><input type='button' value='Buy this sticker' id='<?= $productId ?>' class='buy'></td>
					</tr>
					<?php
				}
				?>

			</tbody>
		</table>


		<!-- CART -->
		<div class='shopping-cart'>
			<div id='cart'>
				<h4>Your cart</h4>

			</div>
		</div>
	</div>
</div>
 
<?php $path=__DIR__; include(__DIR__ . '/../../base/footer.php'); ?>