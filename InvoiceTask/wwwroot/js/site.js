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

function showItems() {
   
    debugger;
    //if (ddlItemType.value == '') {
    //    ddlItem.innerHTML = '<option value="">اختر نوع الصنف</option>';
    //} else {
    const $id = $('#ddlItemType').val()
    $.ajax({
        url: `/Home/GetItems/${$id}`,
        method: 'GET',
        cache: false,
        success: function (data) {
            console.log(data);
            debugger;
            let newItem = '';
            for (let x in data) {
                newItem += `<option value="${data[x].id}">${data[x].itemName}</option>`;
            }
            localStorage.setItem("items", JSON.stringify(data));

            //  ddlItem.innerHTML = newItem;
            $("#ddlItemName").html(newItem);
            console.log("ss", newItem);
            var id = $("#ddlItemType").val();
            localStorage.setItem("itemId", id);
            

        }
    });
   
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
            //  let $sel = $(`<select  id="ddlItemType"><option value="">اختر نوع الصنف</option></select>`);
             allSel += `<tr>
                    <td id="ftd">
                       
                         <select id="ddlItemType" class="drop-list">
                           
                                <option  value="">اختر نوع الصنف</option>

                        
                        </select>

                    </td>
                    <td>
                        <select  id="ddlItemName" >
                            <option value="">اختر اسم الصنف</option>
                        </select>

                    </td>
                    <td>
                        <input type="number" id="price" />
                    </td>
                    <td>
                        <input  type="number" value="0" id="quantity" />
                    </td>
                </tr>`;
            console.log(data);

            let itemTypes = '';
            for (let x in data) {   
                itemTypes += `

                            <option value="${data[x].id}">${data[x].typeName}</option>`;
            }

            console.log("type", itemTypes);
            //  $("#ftd").append($sel);
            $("#tbl").html(allSel);
            /*    tbl.insertAdjacentHTML('afterbegin', td);*/

            $("#ddlItemType").append(itemTypes);
            const is= document.getElementById("ddlItemType");
            console.log("id", is);
            is.addEventListener("change", showItems);
            var ddlItem = document.getElementById("ddlItemName");

            ddlItem.addEventListener("change", function () {

                $.ajax({
                    url: `/Home/GetItemPrice/${ddlItem.value}`,
                    method: 'GET',
                    cache: false,
                    success: function (data) {
                        debugger;
                        console.log(data);
                        var price = document.getElementById("price");

                        price.value = data.price;
                    }
                });
                console.log("fired");
            });
            var qtty = document.getElementById("quantity");
            qtty.addEventListener("change", function (e) {
                e.preventDefault();
                debugger
                console.log("xxxf", e.target.closest("tbody").children.item(1));

                let itemTypes = '';
                for (let x in data) {
                    itemTypes += `

                            <option value="${data[x].id}">${data[x].typeName}</option>`;
                }
                var d = $("#tbl");
                allSel += `<tr>
                    <td id="ftd">
                       
                         <select id="ddlItemType" class="drop-list">
                           
                                <option  value="">اختر نوع الصنف</option>

                        
                        </select>

                    </td>
                    <td>
                        <select  id="ddlItemName" >
                            <option value="">اختر اسم الصنف</option>
                        </select>

                    </td>
                    <td>
                        <input type="number" id="price" />
                    </td>
                    <td>
                        <input  type="number" value="0" id="quantity" />
                    </td>
                </tr>`;


                $("#tbl").html(allSel);
                /*    tbl.insertAdjacentHTML('afterbegin', td);*/
                var f = $("#ddlItemType");

                $("#ddlItemType").append(itemTypes);



            });

        }
           
    });

});
//$("#ddlItemType").on("change", showItems());
//ddlItemType.addEventListener('change', function (e) {
//    console.log(e.target);
//    showItems;
//});

function showPrice(id) {
    debugger;
    
    //$.ajax({
    //    url: `/Home/GetItemPrice/${id}`,
    //    method: 'GET',
    //    cache: false,
    //    success: function (data) {
    //        debugger;
    //        console.log(data);
    //        price.value = data.price;
    //    }
    //});
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



let addNewRow = function () {
    count++;
    let $tr = $(` <tr>
                     <td>
               <select id="ddlItemType" class="drop-list">
                       <option value="">اختر نوع الصنف</option>
               </select>
                </td>
                    <td>
                       <select id="ddlItemName" class="clItemName">
                          <option value="">اختر اسم الصنف</option>
                       </select>

                   </td>
                   <td>
                       <input type="number" id="price" class="clPrice" />
                   </td>
                   <td>
                       <input  type="number" value="0" id="quantity" class="clqtty"  />
                   </td>

                </tr>`);

    if (qtty.value !== undefined && qtty.value > 0) {
        $.ajax({
            url: `/Home/GetItemsType`,
            method: 'GET',
            cache: false,
            success: function (data) {
                debugger;
                console.log(data);

                let itemTypes = '';
                let newItem = '';

                for (let x in data) {
                    itemTypes += `<option value="${data[x].id}">${data[x].typeName}</option>`;
                }                                                                                   
                console.log("qqq", data);
                console.log("type", itemTypes);
                $("#tbl").append($tr)

               // tbl.insertAdjacentHTML('beforeend', $tr);
                let newDll = document.getElementById(`ddlItemType`);
                let newD = document.querySelectorAll(".drop-list");
                newD.forEach(el => {
                    el.innerHTML = itemTypes
                    
                });
                let newObj = localStorage.getItem("items");
                let items = JSON.parse(newObj);
                for (let x in items) {
                    newItem += `<option value="${items[x].id}">${items[x].itemName}</option>`;
                }
                ddlItem.innerHTML = newItem;
            
                console.log("obj", JSON.parse(newObj));
            
                // droplist.innerHTML = itemTypes;
                console.log("yarb", document.querySelector(".drop-list"));

                document.querySelector(".drop-list").addEventListener("change", function (e) {
                    $.ajax({
                        url: `/Home/GetItems/${document.querySelector(".drop-list").value}`,
                        method: 'GET',
                        cache: false,
                        success: function (data) {
                            console.log(data);
                            debugger;
                            let newItem = '';
                            for (let x in data) {
                                newItem += `<option value="${data[x].id}">${data[x].itemName}</option>`;
                            }
                            localStorage.setItem("items", JSON.stringify(data));

                            document.querySelector('.clItemName').innerHTML = newItem;
                          //  $("#ddlItemName").html(newItem);
                            console.log("ss", newItem);
                            console.log("event", e);
                            var id = $("#ddlItemType").val();
                            localStorage.setItem("itemId", id);


                        }
                    });
                });

                document.querySelector(".clItemName").addEventListener("change", function () {
                    debugger;
                    $.ajax({
                        url: `/Home/GetItemPrice/${document.querySelector('.clItemName').value}`,
                        method: 'GET',
                        cache: false,
                        success: function (data) {
                            debugger;
                            console.log(data);
                            document.querySelector('.clPrice').value = data.price;
                        }
                    });

                });

                document.querySelector(".clqtty").addEventListener("change", function () {

                    let $tr = $(` <tr>
                     <td>
               <select id="ddlItemType" class="drop-list">
                       <option value="">اختر نوع الصنف</option>
               </select>
                </td>
                    <td>
                       <select id="ddlItemName" class="clItemName">
                          <option value="">اختر اسم الصنف</option>
                       </select>

                   </td>
                   <td>
                       <input type="number" id="price" class="clPrice" />
                   </td>
                   <td>
                       <input  type="number" value="0" id="quantity" class="clqtty"  />
                   </td>

                </tr>`);

                    $.ajax({
                        url: `/Home/GetItemsType`,
                        method: 'GET',
                        cache: false,
                        success: function (data) {
                            debugger;
                            console.log(data);

                            let itemTypes = '';
                            let newItem = '';

                            for (let x in data) {
                                itemTypes += `<option value="${data[x].id}">${data[x].typeName}</option>`;
                            }
                            console.log("qqq", data);
                            console.log("type", itemTypes);
                            $("#tbl").append($tr)

                            // tbl.insertAdjacentHTML('beforeend', $tr);
                            let newDll = document.getElementById(`ddlItemType`);
                            let newD = document.querySelectorAll(".drop-list");
                            newD.forEach(el => {
                                el.innerHTML = itemTypes

                            });
                            let newObj = localStorage.getItem("items");
                            let items = JSON.parse(newObj);
                            for (let x in items) {
                                newItem += `<option value="${items[x].id}">${items[x].itemName}</option>`;
                            }
                            ddlItem.innerHTML = newItem;

                            console.log("obj", JSON.parse(newObj));

                            // droplist.innerHTML = itemTypes;
                            console.log("yarb", document.querySelector(".drop-list"));
                        }
                        });







                });
                
            }
        });

       

    }



    //if (qtty.value > 0) {
    //    let html = `

    //             <tr>
    //                <td>
    //                    <select id="ddlItemType">
    //                        <option value="">اختر نوع الصنف</option>

    //                    </select>
    //                </td>
    //                <td>
    //                    <select id="ddlItemName">
    //                        <option value="">اختر اسم الصنف</option>
    //                    </select>

    //                </td>
    //                <td>
    //                    <input type="number" id="price" />
    //                </td>
    //                <td>
    //                    <input type="number" value="0" id="quantity" />
    //                </td>
    //            </tr>

    //`;
    //    tbl.innerHTML += html;
    //};

}

//qtty.addEventListener('change', addNewRow);

