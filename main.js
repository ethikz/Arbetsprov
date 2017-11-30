( function() {
  var search = document.getElementsByClassName( 'js-search__input' ),
      searchResults = document.getElementsByClassName( 'js-search__results' ),
      close = document.getElementsByClassName( 'close-button' ),
      searchList = document.getElementById( 'search-list' ),
      key = 0,
      items = [],
      request = new XMLHttpRequest();


  function loadData() {
    request.onreadystatechange = function() {
      if ( request.readyState === 4 ) {
        var listItems = request.response;

        listItems[ 'message' ].forEach( function( value, i ) {
          searchList.insertAdjacentHTML( 'beforeend', '<option value="' + value + '"></option>' );
        });
      }
    }

    request.open( 'Get', 'https://dog.ceo/api/breeds/list', true );
    request.responseType = 'json';
    request.send( null );
  }


  function checkForDuplicate( searchTerm, key ) {
    if ( items.find( function( item ) {
      return item.term === searchTerm;
    }) != undefined ) {
      var termKey = items.find( function( item ) {
        return item.term === searchTerm;
      }).id;

      list = document.querySelectorAll( '[data-key="' + termKey + '"]' );
      list.classList.add( 'hover' );
    } else {
      // console.log( key )
      storeItem( searchTerm, key );
    }
  }


  function storeItem( searchTerm, key ) {
    items.push({
      id: key,
      term: searchTerm
    });

    appendItem( searchTerm, key );
  }


  function appendItem( searchTerm, key ) {
    var today = new Date(),
        dd = today.getDate(),
        mm = today.getMonth(),
        yyyy = today.getFullYear(),
        min = ( '0' + today.getMinutes() ).slice( -2 ),
        hh = today.getHours(),
        date = yyyy + '-' + mm + '-' + dd,
        time = hh + ':' + min,
        listItem = '<li data-key="' + key + '">'
                    + '<div>'
                      + '<span class="search__results-term">' + searchTerm + '</span>'
                    + '</div>'
                    + '<div>'
                      + '<span class="search__results-date-time">' + date + ' @ ' + time + '</span>'
                    + '</div>'
                    + '<div>'
                      + '<button class="close-button" role="img" aria-label="Close">'
                        + '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="close-button__icon">'
                          + '<g id="Layer_2" data-name="Layer 2">'
                            + '<g id="Layer_1-2" data-name="Layer 1">'
                              + '<path d="M50,0a50,50,0,1,0,50,50A50,50,0,0,0,50,0Zm0,94.2A44.2,44.2,0,1,1,94.2,50,44.21,44.21,0,0,1,50,94.2Z" />'
                              + '<path d="M50,54.1l9.4,9.4" />'
                              + '<path d="M59.4,36.5,50,45.9l-9.4-9.4a2.9,2.9,0,1,0-4.1,4.1L45.9,50l-9.4,9.4a2.9,2.9,0,1,0,4.1,4.1L50,54.1l9.4,9.4a2.9,2.9,0,1,0,4.1-4.1L54.1,50l9.4-9.4a3,3,0,0,0,0-4.1A2.78,2.78,0,0,0,59.4,36.5Z" />'
                            + '</g>'
                          + '</g>'
                        + '</svg>'
                      + '</button>'
                    + '</div>'
                  + '</li>';

    if ( dd < 10 ) {
      dd = '0' + dd;
    }

    searchResults[0].classList.remove( 'is-hidden' );
    searchResults[0].insertAdjacentHTML( 'beforeend', listItem );

    search[0].value = '';
  }


  loadData();


  document.addEventListener( 'keyup', function( e ) {
    if ( e.which == 13 && search[0].value != '' ) {
      key = key++;

      checkForDuplicate( search[0].value, key++ );
    }
  });


  document.querySelector( 'body' ).addEventListener( 'click', function( e ) {
    if ( e.target.classList.contains( 'close-button' ) || e.target.classList.contains( 'close-button__icon' ) ) {
      var itemParent;

      if ( e.target.classList.contains( 'close-button' ) ) {
        itemParent = e.target.parentNode.parentNode;
      }

      if ( e.target.classList.contains( 'close-button__icon' ) ) {
        itemParent = e.target.parentNode.parentNode.parentNode;
      }
      items.splice( items.indexOf( itemParent.getAttribute( 'data-key' ) ) );
      itemParent.remove();

      if ( document.querySelectorAll( '.js-search__results li' ).length <= 0 ) {
        searchResults[0].classList.add( 'is-hidden' );

        key = 0;
      }
    }
  });
}() );
