const product = [
    {
        id: 0,
        image: 'cars/accent.png',
        categories: 'coffee',
        title: 'Coffee 1',
        price: 200,
    },
    {
        id: 1,
        image: 'cars/miragehatch.png',
        title: 'Coffee 2',
        price: 360,
    },
    {
        id: 2,
        image: 'cars/mazda.png',
        title: 'Coffee 3',
        price: 230,
    },
    {
        id: 3,
        image: 'cars/montero.png',
        title: 'Coffee 4',
        price: 700,
        }
    ];
    const categories = [...new Set(product.map((item)=>
        {return item}))]
         let i=0;
    document.getElementById('coffee').innerHTML = categories.map((item)=>
    {
        var {image, title, price} = item;
        return(
              `<div class='card'>
                    <img class='images' src=${image}></img>
              <div class='card-body'>
              <h5>${title}</h5>
              <p>Php ${price}.00</p>`+
              "<button class='btn btn-primary' onclick='addtocart("+(i++)+")'>Add to cart</button>"+
              `</div>
              </div>`
        )
    }).join('')

    var cart =[];

    function addtocart(a){
        cart.push({...categories[a]});
        displaycart();
    }
    function delElement(a){
        cart.splice(a, 1);
        displaycart();
    }

    function displaycart(){
        let j = 0, total=0;
        document.getElementById("count").innerHTML=cart.length;
        if(cart.length==0){
            document.getElementById('cartItem').innerHTML = "Your cart is empty";
            document.getElementById("total").innerHTML = "$ "+0+".00";
        }
        else{
            document.getElementById("cartItem").innerHTML = cart.map((items)=>
            {
                var {image, title, price} = items;
                total=total+price;
                document.getElementById("total").innerHTML = "Php "+total+".00";
                return(
                    `<div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src=${image}>
                    </div>
                    <p style='font-size:12px;'>${title}</p>
                    <h2 style='font-size: 15px;'>Php ${price}.00</h2>`+
                    "<span class='material-symbols-outlined' onclick='delElement("+ (j++) +")'>delete</span></div>"
                );
            }).join('');
        }

        
    }