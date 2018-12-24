<template>
<div>
    <!-- <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="#">ABRM Logistics</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Dashboard <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Deliveries</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Data</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Settings</a>
          </li>
        </ul>
      </div>
    </nav> -->
    <div id="sidenav" class="sidenav">
      <div class="sidenav-header"><strong>ABRM Logistics</strong></div>
        <a href="/" v-on:click.prevent="goToPage('/')"><span class="icon"><i class="fal fa-tachometer-alt"></i></span>Dashboard</a>
        <!-- <div class="sidenav-spacer">Deliveries</div> -->
        <a  href="/deliveries" v-on:click.prevent="goToPage('/deliveries')"><span class="icon"><i class="fal fa-truck-container"></i></span>Deliveries</a>
        <div class="sidenav-spacer">Data</div>
        <a  href="/cargos" v-on:click.prevent="goToPage('/cargos')"><span class="icon"><i class="fal fa-box"></i></span>Cargo Types</a>
        <a  href="/countries" v-on:click.prevent="goToPage('/countries')"><span class="icon"><i class="fal fa-flag"></i></span>Countries</a>
        <a  href="/cities" v-on:click.prevent="goToPage('/cities')"><span class="icon"><i class="fal fa-city"></i></span>Cities</a>
        <a  href="/companies" v-on:click.prevent="goToPage('/companies')"><span class="icon"><i class="fal fa-building"></i></span>Companies</a>
        <div class="sidenav-spacer">Settings</div>
        <a  href="/profile" v-on:click.prevent="goToPage('/profile')"><span class="icon"><i class="fal fa-user-circle"></i></span>Profile</a>
        <a  href="/settings" v-on:click.prevent="goToPage('/settings')"><span class="icon"><i class="fal fa-cogs"></i></span>App Settings</a>
        <a  href="#" v-on:click.prevent="logout()"><span class="icon"><i class="fal fa-sign-out-alt"></i></span>Logout</a>
        <div class="sidenav-bottom">
          <span class="text-muted">&copy; ABRM Logistics {{curYear}}</span>
        </div>
    </div>

    <div id="main">
      <div class="card">
        <div class="card-header appHeader">
          <span @click="toggleNav()" v-show="!navOpen" class="menuBtn"><i class="fal fa-bars"></i></span>
          <span @click="toggleNav()" v-show="navOpen" class="menuBtn"><i class="fal fa-times"></i></span>
        </div>
        <div class="card-body appBody">
          <router-view></router-view>
        </div>
      </div>
    </div>
</div>
</template>

<script>
const moment = require('moment')
export default {
  name: 'abrm-anastasia-web',
  data () {
    return {
      navOpen: false
    }
  },
  methods: {
    toggleNav () {
      if (this.navOpen) {
        document.getElementById('sidenav').style.width = '0'
        document.getElementById('main').style.marginLeft = '0'
        document.getElementById('sidenav').style.opacity = '0.01'
        document.body.style.backgroundColor = 'white'
        this.navOpen = !this.navOpen
      } else {
        document.getElementById('sidenav').style.width = '250px'
        document.getElementById('main').style.marginLeft = '250px'
        document.getElementById('sidenav').style.opacity = '1'
        document.body.style.backgroundColor = 'rgba(0,0,0,1)'
        this.navOpen = !this.navOpen
      }
    },
    logout () {
      sessionStorage.removeItem('loggedIn')
      window.history.go()
    },
    goToPage (url) {
      window.$router.push({ path: url })
      this.toggleNav()
    }
  },
  beforeCreate () {
    this.curYear = moment().format('Y')
  },
  mounted () {
  }
}
</script>

<style>
.sidenav {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: var(--gray-dark);
  overflow-x: hidden; /* Disable horizontal scroll */
  /* padding-top: 60px; Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */;
  opacity: 0.01;
}

.sidenav a {
  padding: 5px 0px 5px 5px;
  text-decoration: none;
  font-size: 20.5px;
  color: var(--gray);
  display: block;
  transition: 0.3s;
}

.sidenav a .icon {
  color: var(--white);
  display: inline-block;
  width: 35px;
  /* padding: 5px; */
}

.sidenav-bottom {
  position: fixed;
  padding: 5px 0px 5px 5px;
  font-size: 0.80em;
  bottom: 0px;
}

.sidenav-header {
  padding: 2px;
  text-decoration: none;
  font-size: 23px;
  color: var(--white);
  background-color: rgba(255,255,255,0.05);
  display: block;
  transition: 0.3s;
  height: 5vh;
  text-align: center;
}

.sidenav-spacer {
  padding: 5px 0px 5px 5px;
  text-decoration: none;
  font-size: 25px;
  color: var(--teal);
  background-color: rgba(255,255,255,0.05);
  display: block;
  transition: 0.3s;
}

.sidenav .card-header {
  height: 5.1vh;
}

.sidenav a:hover {
  color: #f1f1f1;
  background-color: rgba(255,255,255,0.1);
  text-decoration: none;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

#main {
  transition: margin-left .5s;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}

.menuBtn {
  /* font-size: 1.5em; */
  /* padding: 5px; */
  width: 15px;
  cursor: pointer;
  -webkit-app-region: no-drag;
}

.closeBtn {
  /* font-size: 1.5em; */
  /* padding: 5px; */
  width: 15px;
  cursor: pointer;
  -webkit-app-region: no-drag;
  top: 7px;
  right: 7px;
  position: absolute
}
.minBtn {
  /* font-size: 1.5em; */
  /* padding: 5px; */
  width: 15px;
  cursor: pointer;
  -webkit-app-region: no-drag;
  top: 7px;
  right: 63px;
  position: absolute
}
.maxBtn {
  /* font-size: 1.5em; */
  /* padding: 5px; */
  width: 15px;
  cursor: pointer;
  -webkit-app-region: no-drag;
  top: 7px;
  right: 35px;
  position: absolute
}

.closeBtn:hover, .minBtn:hover, .maxBtn:hover {
  color: var(--primary)
}

.appHeader {
  height: 5vh;
  -webkit-app-region: drag;
}
.appBody {
  height: 95vh;
  overflow-y: auto
}
html {
  overflow: hidden;
  background-color: var(--gray-dark);
}
</style>
