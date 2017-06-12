$(document).ready(function () { // lo que carga al cargar la página
            //    new WOW().init();
            var sunlightS, sunlightH;
            $.getJSON('http://congress.api.sunlightfoundation.com/legislators?chamber=senate&per_page=all&apikey=f2073c9a-02a0-47a5-9ecb-071de19cedd1').done(function (data) {
                //API KEY: f2073c9a-02a0-47a5-9ecb-071de19cedd1
                sunlightS = data;
                for (i = 0; i < data.results.length; i++) {
                    sunlightS[data.results[i].bioguide_id] = data.results[i].birthday;
                }
            });
            $.getJSON('http://congress.api.sunlightfoundation.com/legislators?chamber=house&per_page=all&apikey=837ea94f520b43a0825be5db3b44a39b').done(function (data) {
                sunlightH = data;
                sunlightH.results.forEach(function (member) {
                    sunlightH[member.bioguide_id] = member.birthday;
                })
                console.log(sunlightH);
            });
            var resultsS, resultsH;
            $.getJSON('https://nytimes-ubiqum.herokuapp.com/congress/113/senate.json').done(function (data) {
                resultsS = data.results[0].members.map(function (member) {
                    return {
                        id: member.id
                        , url: member.url
                        , name: [member.first_name, member.middle_name, member.last_name].join(" ")
                        , state: member.state
                        , seniority: member.seniority
                        , party: member.party
                        , party_name: completarParty(member.party)
                        , total_votes: member.total_votes
                        , votes_with_party_pct: member.votes_with_party_pct
                        , missed_votes: member.missed_votes
                        , missed_votes_pct: member.missed_votes_pct
                        , birthday: sunlightS[member.id]
                    };
                    console.log(resultsS);
                })
            });
            $.getJSON('https://nytimes-ubiqum.herokuapp.com/congress/113/house.json').done(function (data) {
                resultsH = data.results[0].members.map(function (member) {
                    return {
                        id: member.id
                        , url: member.url
                        , name: [member.first_name, member.middle_name, member.last_name].join(" ")
                        , state: member.state
                        , seniority: member.seniority
                        , party: member.party
                        , party_name: completarParty(member.party)
                        , total_votes: member.total_votes
                        , votes_with_party_pct: member.votes_with_party_pct
                        , missed_votes: member.missed_votes
                        , missed_votes_pct: member.missed_votes_pct
                        , birthday: sunlightS[member.id]
                    };
                    console.log("done");
                })
            });
            //___________________________________________// 
            //              ON CLICK EVENTS              //
            $("#menu--toggle-container").on('click', function (e) {
                showNav()
            });
            $("#cross").on('click', function (e) {
                showNav()
            });
            $("#main--nav--about").on('click', function (e) {
                animacion('#hero', '#ppal', '#menu-secundario', '#section-about');
            });
            $("#main--nav--senate").on('click', function (e) {
                mostrarContent(resultsS, '#hero', '#ppal', '#menu-secundario', '#section-senate', '#section-glance', '#section-attendance', '#section-loyalty', '#section-members', 'Senate ', 'img/senate_ataglance.jpg');
                fijarMenu();
            });
            $("#main--nav--house").on('click', function (e) {
                mostrarContent(resultsH, '#hero', '#ppal', '#menu-secundario', '#section-house', '#section-glance', '#section-attendance', '#section-loyalty', '#section-members', 'House of Representatives ', 'img/house_ataglance.jpg');
                fijarMenu();
                //      scrollSpy();
            });
            $("#main--nav--contact").on('click', function (e) {
                animacion('#hero', '#ppal', '#menu-secundario', '#section-contact');
            });
            $("#scroll").on('click', function (e) {
                $("#hero").slideUp(1000);
                $("#ppal").hide(1300);
                $("#section-contact").delay(100).show(1000);
            });
            $(".top").on('click', function (e) {
                redireccionar();
            });
            $("#menu-secundario-senate").on('click', function (e) {
                // numberOfParty(resultsS,sunlightS);
                printNumbOfReps(resultsS, 'Senate ');
                printTable(resultsS, 'SENATOR');
                loyalty(resultsS);
                engaged(resultsS);
                $("#section-house").hide();
                $("#section-senate").show();
                $("#img-glance").prop('src', "img/senate_ataglance.jpg");
                $("#section-glance").show();
                $("#section-attendance").show();
                $("#section-loyalty").show();
                console.log("senate");
            });
            $("#menu-secundario-house").on('click', function (e) {
                printNumbOfReps(resultsH, 'House of representatives ');
                printTable(resultsH, 'HOUSE MEMBERS');
                loyalty(resultsH);
                engaged(resultsH);
                $("#section-senate").hide();
                $("#section-house").show();
                $("#img-glance").prop('src', "img/house_ataglance.jpg");
                $("#section-glance").show();
                $("#section-attendance").show();
                $("#section-loyalty").show();
                console.log("house");
            });
            $("#menu-secundario-contact").on('click', function (e) {});
            //              ON CLICK EVENTS              //
            //___________________________________________//
            function fijarMenu() {
                $(window).scroll(function () {
                    var y = $(this).scrollTop(), //get page y value 
                        header = $("#nav-secundario");
                    if (y >= 98.18) {
                        header.css({
                            "position": "fixed"
                            , "width": "100%"
                            , "top": "0"
                            , "z-index": "9999"
                            , "left": "0"
                        });
                        //        header.css({position: "fixed", "top" : "0", "left" : "0"});
                    }
                    else {
                        header.removeAttr("style");
                    }
                });
            };
    
//    
//            // Cache selectors
//            var lastId, topMenu = $("#nav-secundario")
//                , topMenuHeight = topMenu.outerHeight() + 15, // All list items
//                menuItems = topMenu.find("a"), // Anchors corresponding to menu items
//                scrollItems = menuItems.map(function () {
//                    var item = $($(this).attr("href"));
//                    if (item.length) {
//                        return item;
//                    }
//                });
//            // Bind click handler to menu items
//            // so we can get a fancy scroll animation
//            menuItems.click(function (e) {
//                var href = $(this).attr("href")
//                    , offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
//                $('html, body').stop().animate({
//                    scrollTop: offsetTop
//                }, 300);
//                e.preventDefault();
//            });
//            // Bind to scroll
//            $(window).scroll(function () {
//                    // Get container scroll position
//                    var fromTop = $(this).scrollTop() + topMenuHeight;
//                    // Get id of current scroll item
//                    var cur = scrollItems.map(function () {
//                        if ($(this).offset().top < fromTop) return this;
//                    });
//                    // Get the id of the current element
//                    cur = cur[cur.length - 1];
//                    var id = cur && cur.length ? cur[0].id : "";
//                    if (lastId !== id) {
//                        lastId = id;
//                        // Set/remove active class
//                        menuItems.parent().removeClass("active").end().filter("[href='#" + id + "']").parent().addClass("active");
//                    }
//                };
            });
        //            MEMBERS SCRIPTS                //
        //___________________________________________//
        //party: para poder canviar la inicial del partido a la palabra correspondiente (Republican, Democrat y Independent)
        function completarParty(party) {
            if (party == "R") {
                return "Republican";
            }
            else if (party == "I") {
                return "Independent";
            }
            else if (party == "D") {
                return "Democrate";
            }
            return "";
        };
        //printTable: parametros  json = datos del senado o de house/ titulo: senate o house of representatives de la tabla "members" general.
        function printTable(json, titulo) {
            $("#titulo1").html(titulo);
            var objeto = {
                dato: json
            };
            var salida = "{{#dato}}\
            <tr>\
            <td><a href='{{url}}'>{{name}}\
            <td>{{party_name}}</td>\
            <td>{{state}}</td>\
            <td>{{votes_with_party_pct}}</td>\
            <td>{{seniority}}</td>\
            <td>{{birthday}}</td>\
            </tr>\
            {{/dato}}";
            $('#tableBody').html(Mustache.render(salida, objeto));
        };
        /*numberOfParty: statistics contiene la cantidad de miembros de cada partido; membersR: 
        contiene la información de los miembros Republicanos; membersI: contiene la información 
        de los miembros Independientes; membersD: contiene la información de los miembros
        Democratas.*/
        function numberOfParty(json) {
            var members = json
                , membersR = members.filter(function (member) {
                    return member.party == "R";
                })
                , membersI = members.filter(function (member) {
                    return member.party == "I";
                })
                , membersD = members.filter(function (member) {
                    return member.party == "D";
                });
            var votedPrtR = membersR.reduce(function (valorAnterior, vector) {
                    return valorAnterior + parseFloat(vector.votes_with_party_pct);
                }, 0)
                , votedPrtI = membersI.reduce(function (valorAnterior, vector) {
                    return valorAnterior + parseFloat(vector.votes_with_party_pct);
                }, 0)
                , votedPrtD = membersD.reduce(function (valorAnterior, vector) {
                    return valorAnterior + parseFloat(vector.votes_with_party_pct);
                }, 0);
            var statistics = {
                membersR: membersR
                , membersI: membersI
                , membersD: membersD
                , totalR: membersR.length
                , totalI: membersI.length
                , totalD: membersD.length
                , fidelityR: votedPrtR.toFixed(2)
                , fidelityI: votedPrtI.toFixed(2)
                , fidelityD: votedPrtD.toFixed(2)
            };
            return statistics;
        };
        /*printNumbOfReps: imprime la tabla de "at a glance". Los parametros json: data.results[0].members de la anterior función numberOfParty; titulo: puede ser Senate o House of representatives. */
        function printNumbOfReps(json, titulo) {
            var statistics = numberOfParty(json);
            $("#titulo-glance").html(titulo);
            $("#number-of-reps td:eq(1)").html(statistics.totalR);
            $("#number-of-reps td:eq(2)").html((statistics.fidelityR / statistics.totalR).toFixed(2));
            $("#number-of-reps td:eq(4)").html(statistics.totalD);
            $("#number-of-reps td:eq(5)").html((statistics.fidelityD / statistics.totalD).toFixed(2));
            $("#number-of-reps td:eq(7)").html(statistics.totalI);
            $("#number-of-reps td:eq(8)").html((statistics.fidelityI / statistics.totalI).toFixed(2));
        };

        function loyalty(json) {
            var members = json
                , maximo = parseInt(members.length / 10);
            //Array ordenada de TODOS los miembros de menor a mayor Loyal /{0}       
            leastLoyal = members.sort(function (a, b) {
                return parseFloat(a.votes_with_party_pct) - parseFloat(b.votes_with_party_pct);
            }).filter(function (member) {
                return member.votes_with_party_pct != 0
            });
            //Array ordenada de TODOS los miembros de mayor a menor Loyal /{0}
            mostLoyal = members.sort(function (a, b) {
                return parseFloat(b.votes_with_party_pct) - parseFloat(a.votes_with_party_pct);
            }).filter(function (member) {
                return member.missed_votes_pct != 0
            });
            while (maximo < members.length && members[maximo] == members[maximo - 1]) {
                maximo++;
            };
            //Array con el 10% de los miembros leastLoyal
            leastLoyal = leastLoyal.filter(function (member, i) {
                return i < maximo;
            });
            //Array con el 10% de los miembros mostLoyal
            mostLoyal = mostLoyal.filter(function (member, i) {
                return i < maximo;
            });
            //Objetos para poder usar el mustache 
            var objeto = {
                dato: leastLoyal
            };
            var objeto1 = {
                dato1: mostLoyal
            };
            salidaLeast = "{{#dato}}\
                            <tr>\
                            <td><a href='{{url}}'>{{first_name}} {{middle_name}}  {{last_name}}\
                            <td>{{total_votes}}</td>\
                            <td>{{votes_with_party_pct}}</td>\
                            </tr>\
                            {{/dato}}";
            salidaMost = "{{#dato1}}\
                            <tr>\
                            <td><a href='{{url}}'>{{first_name}} {{middle_name}}  {{last_name}}\
                            <td>{{total_votes}}</td>\
                            <td>{{votes_with_party_pct}}</td>\
                            </tr>\
                            {{/dato1}}";
            $("#least-loyal").html(Mustache.render(salidaLeast, objeto));
            $("#most-loyal").html(Mustache.render(salidaMost, objeto1));
        };

        function engaged(json) {
            var members = json
                , maximo = parseInt(members.length / 10);
            //Array ordenada de TODOS los miembros de menor a mayor Engaged /{0}       
            leastEngaged = members.sort(function (a, b) {
                return parseFloat(a.missed_votes_pct) - parseFloat(b.missed_votes_pct);
            }).filter(function (member) {
                return member.missed_votes_pct != 0
            });
            //Array ordenada de TODOS los miembros de mayor a menor Engaged /{0} 
            mostEngaged = members.sort(function (a, b) {
                return parseFloat(b.missed_votes_pct) - parseFloat(a.missed_votes_pct);
            }).filter(function (member) {
                return member.missed_votes_pct != 0
            });
            while (maximo < members.length && members[maximo] == members[maximo - 1]) {
                maximo++;
            };
            //Array con el 10% de los miembros leastEngaged
            leastEngaged = leastEngaged.filter(function (member, i) {
                    return i < maximo;
                })
                //Array con el 10% de los miembros mostEngaged
            mostEngaged = mostEngaged.filter(function (member, i) {
                    return i < maximo;
                })
                //Objetos para poder usar el mustache    
            var objeto = {
                dato: leastEngaged
            };
            salidaLeast = "{{#dato}}\
                            <tr>\
                            <td><a href='{{url}}'>{{first_name}} {{middle_name}}  {{last_name}}\
                            <td>{{missed_votes}}</td>\
                            <td>{{missed_votes_pct}}</td>\
                            </tr>\
                            {{/dato}}";
            //Objetos para poder usar el mustache 
            var objeto1 = {
                dato1: mostEngaged
            };
            salidaMost = "{{#dato1}}\
                            <tr>\
                            <td><a href='{{url}}'>{{first_name}} {{middle_name}}  {{last_name}}\
                            <td>{{missed_votes}}</td>\
                            <td>{{missed_votes_pct}}</td>\
                            </tr>\
                            {{/dato1}}";
            $("#least-engaged").html(Mustache.render(salidaLeast, objeto));
            $("#most-engaged").html(Mustache.render(salidaMost, objeto1));
        };

        function calcularDatos(json, titulo) {
            printNumbOfReps(json, titulo);
            printTable(json, titulo);
            loyalty(json);
            engaged(json);
        };
        //##########MEMBERS SCRIPTS############//
        //##########VIMEO VIDEO###########//
        window.onload = function cargarIndex() {
            // Find all YouTube videos
            var $allVideos = $("iframe[src^='//player.vimeo.com']"), // The element that is fluid width
                $fluidEl = $("body");
            // Figure out and save aspect ratio for each video
            $allVideos.each(function () {
                $(this).data('aspectRatio', this.height / this.width)
                    // and remove the hard coded width/height
                    .removeAttr('height').removeAttr('width');
            });
            // When the window is resized
            $(window).resize(function () {
                var newWidth = $fluidEl.width();
                // Resize all videos according to their own aspect ratio
                $allVideos.each(function () {
                    var $el = $(this);
                    $el.width(newWidth).height(newWidth * $el.data('aspectRatio'));
                });
                // Kick off one resize to fix all videos on page load
            }).resize();
        };
        //######VIMEO VIDEO##############//
        //########ANIMATION NAV BAR###########//
        function redireccionar() {
            window.location = "index.html";
        };
        /* -------------------------------- 

        Animacion menu ppal para House y Senator

        -------------------------------- */
        function mostrarContent(json, subir, esconder, section1, section2, section3, section4, section5, section6, titulo, imgsrc) {
            showNav();
            $(subir).slideUp(1000);
            $(esconder).hide(1300);
            $(section1).delay(1000).slideDown(1000);
            $(section2).delay(800).show(1000);
            $(section3).delay(800).show(1000);
            $(section4).delay(800).show(1000);
            $(section5).delay(800).show(1000);
            $(section6).delay(800).show(1000);
            $("#img-glance").attr('src', imgsrc);
            calcularDatos(json, titulo);
        };
        /* -------------------------------- 

        Animacion menu ppal para About y Contact

        -------------------------------- */
        function animacion(subir, esconder, section1, section2) {
            $(subir).slideUp(1000);
            $(esconder).hide(1300);
            $(section1).delay(800).slideDown(1000);
            $(section2).delay(800).slideDown(1000);
            showNav();
        };
        /* -------------------------------- 

        Animacion para esconder o mostrar Menu ppal

        -------------------------------- */
        function showNav() {
            $('#global--nav').toggle();
        };
        //$("#nav-secundario").not('#not, #menu-secundario-senate, #menu-secundario-house').find("a").click(function(e) {
        $("#nav-secundario").find("a").not('#not, #menu-secundario-senate, #menu-secundario-house').click(function (e) {
            e.preventDefault();
            var section = $(this).attr("href");
            $("html, body").animate({
                scrollTop: $(section).offset().top
            });
        });
        /* -------------------------------- 

         Animacion para mostrar contenido de House o Senate en menú secundario

         -------------------------------- */
        //#########APUNTES#########//
        //document.getElementById("senate-data").innerHTML = JSON.stringify(dataSenate, null, 2);
        //data.results[0]["members"]==dataSenate.results[0].members