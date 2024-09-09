'use strict';
// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.
var count = 0;
// Write your JavaScript code.
var ddlItemType = document.getElementById(`ddlItemType`);
var ddlItem = document.getElementById("ddlItemName");
var qtty = document.getElementById("quantity");
var tbl = document.getElementById("tbl");
var price = document.getElementById("price");
var droplist = document.querySelector('.drop-list');
var fTd = document.getElementById("ftd");
showInvoiceData();
function showItems(e) {

    debugger;
  
    const $id = $('#ddlItemType').val()
    if (e.value == "") {
        nex.innerHTML = `<option value="">اختر نوع الصنف</option>`
    } else {

        $.ajax({
            url: `/Home/GetItems/${e.value}`,
            method: 'GET',
            cache: false,
            success: function (data) {
                console.log(data);
                debugger;
                let newItem = '';
                for (let x in data) {
                    newItem += `<option value="${data[x].id}">${data[x].itemName}</option>`;
                }

                console.log("who", e);
                localStorage.setItem("items", JSON.stringify(data));
                console.log("this", e);
                
                console.log("now", e.closest("td").nextElementSibling.firstElementChild);
                let nextEl = document.querySelector("#ddlItemType").closest("td").nextElementSibling.firstElementChild;
                console.log("nextEl", document.querySelector("#ddlItemType").closest("td").nextElementSibling.firstElementChild);
                let nex = e.closest("td").nextElementSibling.firstElementChild;
                nex.innerHTML = newItem;
              
                console.log("ss", newItem);
                var id = $("#ddlItemType").val();
                localStorage.setItem("itemId", id);


            }
        });
    }

    //}
};

let allSel = '';
document.addEventListener('DOMContentLoaded', function (e) {
    $.ajax({
        url: `/Home/GetItemsType`,
        method: 'GET',
        cache: false,
        success: function (data) {
            console.log("dom", e);
            debugger;
            count++;
           
            allSel += `<tr>
                    <td id="ftd">
                       
                         <select id="ddlItemType" class="drop-list" onchange="showItems(this)">
                           
                                <option  value="">اختر نوع الصنف</option>

                        
                        </select>

                    </td>
                    <td>
                        <select  id="ddlItemName" onchange="showPrice(this)">
                            <option value="">اختر اسم الصنف</option>
                        </select>

                    </td>
                    <td>
                        <input type="number" id="price" />
                    </td>
                    <td>
                        <input  type="number"  id="quantity" onblur="addNewForm(this)" />
                    </td>
                </tr>`;
            console.log(data);

            let itemTypes = '';
            for (let x in data) {
                itemTypes += `

                            <option value="${data[x].id}">${data[x].typeName}</option>`;
            }

            console.log("type", itemTypes);
            
            $("#tbl").html(allSel);
        

            $("#ddlItemType").append(itemTypes);
            const is = document.getElementById("ddlItemType");
            console.log("id", is);
          
            var ddlItem = document.getElementById("ddlItemName");

           

        }

    });

});

function showPrice(e) {
    debugger;
    let itemId = document.getElementById("ddlItemName").value;
    $.ajax({
        url: `/Home/GetItemPrice/${e.value}`,
        method: 'GET',
        cache: false,
        success: function (data) {
            console.log("showPrice",e);
            debugger;
            console.log(data);
            console.log("price",e.closest("td").nextElementSibling.firstElementChild);
           
            e.closest("td").nextElementSibling.firstElementChild.value = data.price;
            
        }
    });
}







debugger;
let itemId = localStorage.getItem("itemId");
console.log("itemId", itemId);
console.log("el", ddlItem);
//ddlItem.addEventListener("change", function () {

//    $.ajax({
//        url: `/Home/GetItemPrice/${ddlItem.value}`,
//        method: 'GET',
//        cache: false,
//        success: function (data) {
//            debugger;
//            console.log(data);
//            price.value = data.price;
//        }
//    });
//    console.log("fired");
//});


//document.getElementById("quantity").addEventListener("change", function (e) {
//    console.log("changed",e)
//})








function addNewForm(e) {
    $.ajax({
        url: `/Home/GetItemsType`,
        method: 'GET',
        cache: false,
        success: function (data) {
            let newSel = '';
            debugger;
            count++;
            console.log("who are you", e.value);
            newSel += `<tr>
                    <td id="ftd">
                       
                         <select id="ddlItemType" class="drop-list" onchange="showItems(this)">
                           
                                <option  value="">اختر نوع الصنف</option>

                        
                        </select>

                    </td>
                    <td>
                        <select  id="ddlItemName" onchange="showPrice(this)">
                            <option value="">اختر اسم الصنف</option>
                        </select>

                    </td>
                    <td>
                        <input type="number" id="price" />
                    </td>
                    <td>
                        <input  type="number"  id="quantity" onblur="addNewForm(this)"/>
                    </td>
                </tr>`;
            console.log(data);

            let itemTypes = '';
            for (let x in data) {
                itemTypes += `

                            <option value="${data[x].id}">${data[x].typeName}</option>`;
            }

            console.log("type", itemTypes);
           
            document.querySelector("#tbl").insertAdjacentHTML("beforeend", newSel);
            let lastch = document.querySelector("#ddlItemType").closest("tbody").lastElementChild.firstElementChild.firstElementChild;
            lastch.innerHTML = itemTypes;

            console.log("lastone", document.querySelector("#ddlItemType").closest("tbody").lastElementChild.firstElementChild.firstElementChild);


            document.querySelector("#ddlItemType").innerHTML= itemTypes;

         
            const is = document.getElementById("ddlItemType");
            console.log("id", is);
        
            var ddlItem = document.getElementById("ddlItemName");

         

        }

    });
    let quantity = e;
    let itemTypeId = e.closest("td").previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild;
    let itemId = e.closest("td").previousElementSibling.previousElementSibling.firstElementChild;
    let price = e.closest("td").previousElementSibling.firstElementChild;
    let dateInvoice = e.closest("#frm").firstElementChild.firstElementChild.nextElementSibling;
    let invoiceId = dateInvoice.nextElementSibling.nextElementSibling;
    let clientName = invoiceId.nextElementSibling.nextElementSibling;
    console.log("itemTypeId", itemTypeId);
    console.log("itemIdd", itemId);
    console.log("price", price);
    console.log("name", dateInvoice);
    console.log("invoiceId", invoiceId);
    console.log("clientName", clientName);
    console.log("quantity", quantity);

    let objInvoice = {

        ItemId: itemId.value,
        ItemTypeId: itemTypeId.value,
        ClientName: clientName.value,
        Price: price.value,
        quantity: quantity.value,
        InvoiceDate: dateInvoice.value

    };

    let dat = JSON.stringify(objInvoice);
    debugger;
    $.ajax({
        url: '/Home/AddInvoice',
        method: 'POST',
        contentType: 'application/json',
        data: dat,
        cache: false,
        success: function () {
            console.log("success");
            showInvoiceData();
        }
    });



}

function showInvoiceData() {
    $.ajax({
        url: `/Home/GetInvoices`,
        method: 'GET',
        cache: false,
        success: function (data) {
            let table = '';
            for (let x in data) {
                table += `
                
                <tr>
              <td><a href="/Home/Edit/${data[x].id}">#${data[x].id}</a></td>
                <td>${data[x].clientName}</td>
                <td>${data[x].itemType.typeName}</td>
                <td>${data[x].item.itemName}</td>
                <td>${data[x].price}</td>
                <td>${data[x].quantity}</td>
                <td>${data[x].total}</td>

                </tr>
                
                
                `;
            }
            document.getElementById("invoicedt").innerHTML = table;

        }
    });
}

$("#searchDt").on('keyup', function () {
    debugger;
    var name = $(this).val();
    if (name !== '') {
        $.ajax({
            url: `/Home/GetInvoic/${name}`,
            method: 'GET',
            cache: false,
            success: function (data) {

                let table = '';
                for (let x in data) {
                    table += `
                
                <tr>
                <td><a href="/Home/Edit/${data[x].id}">#${data[x].id}</a></td>
                <td>${data[x].clientName}</td>
                <td>${data[x].itemType.typeName}</td>
                <td>${data[x].item.itemName}</td>
                <td>${data[x].price}</td>
                <td>${data[x].quantity}</td>
                <td>${data[x].total}</td>

                </tr>
                
                
                `;
                }
                document.getElementById("invoicedt").innerHTML = table;

            }
        });
    } else {
        showInvoiceData();
    }


  
})


function writeName() {
    console.log("Ahmed Alaa");
}