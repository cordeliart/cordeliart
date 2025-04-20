backup


.scroller {
    display: block;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    -ms-overflow-style: none;
    scrollbar-width: none;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 0 5vh;
}

/* .scroller::-webkit-scrollbar {
    display: none;
} */

.section {
    box-sizing: border-box;
    scroll-snap-align: start;
    overflow-y: hidden;
}

.big { height: 70vh; }
.small { height: 55vh; }
.small .section { padding-top: 5vh; }
.mini { height: 50vh; }
.nest { padding-top: 5vh; }
