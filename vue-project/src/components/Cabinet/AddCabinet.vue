<template>
  <div id="addcabinet">
    <div class="wrapper-stepper" style="text-align: center;">
      <div style="margin-bottom: 40px; margin-top: 10px;">
        <p style="font-size: 30px; font-weight: bold;">Add Cabinet</p>
      </div>
      <div class="stepper">
        <div class="stepper-progress">
          <div class="stepper-progress-bar" :style="'width:' + stepperProgress"></div>
        </div>

        <div class="stepper-item" :class="{ 'current': step == index + 1 && step != 5, 'success': step > index + 1, 'finish': step == index + 1 && step == 5 }" v-for="(item, index) in items">
          <div class="stepper-item-counter">

            <span class="number">
              {{ index + 1 }}
            </span>
          </div>
          <span class="stepper-item-title">
            {{ item }}
          </span>
        </div>

      </div>

      <div class="stepper-content" v-if="step == 1">
        <p class="addtitle">Cabinet</p>
        <div class="stepper-pane">
          <div class="row">
            <div style="position: relative;">
              <img src="../../assets/images/cabinet.jpg" class="image" />
              <h1 style=" position: absolute;top:180px; left:132px; color: white; font-size: 20px;">AED</h1>
            </div>
            <div class="pull">
              <h1 style="font-size: 30px;">Lime</h1><br>
              <p>Model : LIME-K10</p><br>
              <p>Serial : LIME020202919</p><br>
              <p>24VDC / 3A Max</p>
            </div>
          </div>

          <div class="title">Model</div>
          <select class="addinput" v-model="model">
            <option value="">Select</option>
            <option value="10">LIME-K10</option>
            <option value="11">LIME-K11</option>
          </select>
          <div class="margin1 title">Serial Number</div>
          <input type="text" class="addinput" v-model="serialno">
        </div>
      </div>
      <div class="stepper-content" v-if="step == 2">
        <p class="addtitle">Setting</p>
        <div class="stepper-pane">

          <div class="title">Title</div>
          <input type="text" class="addinput" v-model="motitle">

          <div class="margin1 title">Address</div>
          <input type="text" class="margin2" style="width:800px;" v-model="address">
          <div class="row" style="margin-top :20px">
            <div>
              <div class="title">Address line2</div>
              <input type="text" class="addinput" v-model="addressline">
            </div>
            <div style="margin-left: 100px;">
              <div class="title">Address line2</div>
              <input type="text" class="addinput" v-model="addressline2">
            </div>
          </div>

          <div class="row margin1">
            <div>
              <div class="title">City</div>
              <input type="text" class="addinput" v-model="city">
            </div>
            <div style="margin-left: 100px;">
              <div class="title">State</div>
              <input type="text" class="addinput" v-model="state">
            </div>
          </div>

          <div class="row margin1">
            <div>
              <div class="title">Country</div>
              <select class="addinput" v-model="country">
                <option value=""></option>
                <option value="10">Korea</option>
                <option value="11">Japan</option>
              </select>
            </div>
            <div style="margin-left: 100px;">
              <div class="title">Language</div>
              <select class="addinput" v-model="language">
                <option value=""></option>
                <option value="10">Ko</option>
                <option value="11">Ja</option>
              </select>
            </div>
          </div>

          <div class="row margin1">
            <div>
              <div class="title">Min. Heating</div>
              <input type="text" class="addinput" v-model="minheat">
            </div>
            <div style="margin-left: 100px;">
              <div class="title">Max. Ventilation</div>
              <input type="text" class="addinput" v-model="maxvent">
            </div>
          </div>

          <div class="margin1">
            <div class="title">Siren</div>
            <div class="margin2">
              <label><input type="radio" name="siren" value="off" v-model="siren"><span class="radio">Off</span></label>
              <label><input type="radio" name="siren" value="Low" v-model="siren"><span class="radio"> Low
                  volume</span></label>
              <label><input type="radio" name="siren" value="High" v-model="siren"><span class="radio"> High
                  volume</span></label>
            </div>
          </div>

          <div class="margin1">
            <div class="title">LCD</div>
            <div class="margin2">
              <label><input type="radio" name="lcd" value="off" v-model="lcd"> <span class="radio">Off</span></label>
              <label><input type="radio" name="lcd" value="on" v-model="lcd"> <span class="radio">On</span></label>
            </div>
          </div>

        </div>

      </div>

      <div class="stepper-content" v-if="step == 3">
        <p class="addtitle">AED</p>
        <div class="stepper-pane">
          <div class="row">
            <div>
              <div class="title">Manufacturer</div>
              <select class="addinput" v-model="aedmanufacturer">
                <option value="">Select</option>
                <option value="10">Korea</option>
                <option value="11">Japan</option>
              </select>
            </div>
            <div style="margin-left: 100px;">
              <div class="title">Model</div>
              <select class="addinput" v-model="aedmodel">
                <option value="">Select</option>
                <option value="10">Ko</option>
                <option value="11">Ja</option>
              </select>
            </div>
          </div>

          <div class="row margin1">
            <div>
              <div class="title">S/N</div>
              <input type="text" class="addinput" v-model="aedsno">
            </div>
            <div style="margin-left: 100px;">
              <div class="title">Warranty</div>
              <input type="text" class="addinput" v-model="aedwarranty">
            </div>
          </div>

          <div class="margin1">
            <div class="title">Battery Expiration date</div>
            <input type="text" class="addinput" v-model="aedbatdate">
          </div>

          <div class="margin1">
            <div class="title">Pads Expiration date</div>
            <input type="text" class="addinput" v-model="aedpaddate">
          </div>
        </div>

      </div>

      <div class="stepper-content" v-if="step == 4">
        <p class="addtitle">Notifications</p>
        <div class="stepper-pane">
          <div class="row">
            <div>
              <div class="title">User Name</div>
              <input type="text" class="addinput" v-model="username">
            </div>
            <div style="margin-left: 100px;">
              <div class="title">Email</div>
              <input type="text" class="addinput" v-model="aedemail">
            </div>
          </div>
          <div class="margin1">
            <div class="title">Phone number</div>
            <input type="text" style="width:50px; margin-top: 10px; border: none;" v-model="phone1">
            <input type="text" style="width:140px; margin-left: 10px; border: none;" v-model="phone2">
            <input type="text" style="width:140px; margin-left: 10px; border: none;" v-model="phone3">
          </div>

          <div style="margin-top: 40px; ">
            <table style="width: 800px;">
              <colgroup>
                <col width="60%">
                <col width="20%">
                <col width="20%">
              </colgroup>
              <thead>
                <tr>
                  <th class="eventcol">Events </th>
                  <th class="eventcol">Email </th>
                  <th class="eventcol">SMS </th>
                </tr>

              </thead>
              <tbody>
                <tr>
                  <td>Opened</td>
                  <td><input type="checkbox" v-model="eventopened" value="E"> </td>
                  <td><input type="checkbox" v-model="eventopened" value="S"> </td>
                </tr>
                <tr>
                  <td>Closed </td>
                  <td><input type="checkbox" v-model="eventclosed" value="E"> </td>
                  <td><input type="checkbox" v-model="eventclosed" value="S"> </td>
                </tr>
                <tr>
                  <td>AED taken off </td>
                  <td><input type="checkbox" v-model="aedtakenoff" value="E"> </td>
                  <td><input type="checkbox" v-model="aedtakenoff" value="S"> </td>
                </tr>
                <tr>
                  <td>AED Status </td>
                  <td><input type="checkbox" v-model="aedstatus" value="E"> </td>
                  <td><input type="checkbox" v-model="aedstatus" value="S"> </td>
                </tr>
                <tr>
                  <td>Power </td>
                  <td><input type="checkbox" v-model="power" value="E"> </td>
                  <td><input type="checkbox" v-model="power" value="S"> </td>
                </tr>
                <tr>
                  <td>AED Warrantly (D-90) </td>
                  <td><input type="checkbox" v-model="aedwarrantlycheck" value="E"> </td>
                  <td><input type="checkbox" v-model="aedwarrantlycheck" value="S"> </td>
                </tr>
                <tr>
                  <td>Battery/Pad Expire Date (D-90) </td>
                  <td><input type="checkbox" v-model="battertycheckdate" value="E"> </td>
                  <td><input type="checkbox" v-model="battertycheckdate" value="S"> </td>
                </tr>
                <tr>
                  <td>Temperature Not OK </td>
                  <td><input type="checkbox" v-model="temperaturenotok" value="E"> </td>
                  <td><input type="checkbox" v-model="temperaturenotok" value="S"> </td>
                </tr>
                <tr>
                  <td>Cabinet Abnormal</td>
                  <td><input type="checkbox" v-model="cabinetabnormal" value="E"> </td>
                  <td><input type="checkbox" v-model="cabinetabnormal" value="S"> </td>
                </tr>
                <tr style="text-align: center; font-weight: bold;">
                  <td colspan="3"><div class="adduser" @click="adduser()" >+ ADD ANOTHER USER</div></td>
                </tr>

              </tbody>


            </table>

          </div>

        </div>

      </div>

      <div class="stepper-content" v-if="step == 5">

        <div class="stepper-pane">
          <div style=" margin-top: 70px; margin-left: 330px;">
            <span id="checkicon" class="material-symbols-outlined">
              check_circle
            </span>
          </div>
          <div class="margin1"><span id="sucessspan">Cabinet
              Successfully Added</span></div>

          <router-link to="/mydashboard">
            <button id="finishbtn">
              Dashboard
            </button>
          </router-link>
        </div>



      </div>
      <div class="controls" v-if="step != 5">
        <button class="btn" @click="step--" :disabled="step == 1">
          &lt; Previous
        </button>
        <button class="btn btn--green-1" @click="step++" :disabled="step == 5">
          Next &gt;
        </button>


      </div>

    </div>



  </div>
</template>



<script>
export default {

  data() {
    return {
      step: 1,
      items: ['cabinet', 'Setting', 'AED', 'Notifications', 'Finish'],
      country: '',
      model: '',
      language: '',
      address: '',
      addressline: '',
      addressline2: '',
      motitle: '',
      siren: '',
      lcd: '',
      aedpaddate: '',
      aedbatdate: '',
      aedwarranty: '',
      aedsno: '',
      aedmodel: '',
      aedmanufacturer: '',
      eventopened: [],
      eventclosed: [],
      aedtakenoff: [],
      aedstatus: [],
      power: [],
      aedwarrantlycheck: [],
      battertycheckdate: [],
      temperaturenotok: [],
      cabinetabnormal: [],




    };
  },
  computed: {
    stepperProgress() {
      return (100 / 4) * (this.step - 1) + '%'
    }
  },
  methods:{
    adduser(){
      console.log("Aaa");
    }
  }
}
</script>


<style lang="scss" scoped>
.wrapper-stepper {
  margin-left: 20px;
  margin-top: 20px;
  background-color: white;
  height: 875px;
  border-radius: 10px;
  box-shadow: 3px 3px 5px #bdbebd;
  width: 1620px;
  padding-top: 10px;
  background-color: #fff;
}

.stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1200px;
  margin-left: 200px;
  position: relative;
  z-index: 0;
  margin-bottom: 24px;

  &-progress {
    position: absolute;
    background-color: grey;
    height: 2px;
    z-index: -1;
    left: 0;
    right: 0;
    margin: 0 auto;

    &-bar {
      position: absolute;
      left: 0;
      height: 100%;
      width: 66%;
      background-color: #32CD32;


    }

  }
}

.stepper-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: grey;
  transition: 1s;

  &-counter {
    height: 50px;
    width: 50px;
    display: grid;
    place-items: center;
    background-color: white;
    border-radius: 100%;
    border: 4px solid grey;
    position: relative;
    transition: 1s;

    .number {
      font-size: 20px;

    }

  }

  &-title {
    position: absolute;
    font-size: 18px;
    bottom: -24px;
    transition: 1s;
  }
}

.stepper-item.success {
  .stepper-item-counter {
    border: 4px solid #32CD32;
    background-color: #32CD32;
    color: white;
    font-weight: 600;
    transition: 1s;



    .number {
      opacity: 1;
      color: white;
      transform: scale(1.2);

    }
  }



  .stepper-item-title {

    color: #32CD32;
  }
}

.stepper-item.finish {
  .stepper-item-counter {
    border: 4px solid #32CD32;
    background-color: #32CD32;
    color: white;
    font-weight: 600;
    transition: 1s;



    .number {
      opacity: 1;
      color: white;
      transform: scale(1.2);

    }
  }



  .stepper-item-title {

    color: #32CD32;
  }
}

.stepper-item.current {
  .stepper-item-counter {
    border-color: #32CD32;
    background-color: white;
    color: #32CD32;
    font-weight: 600;
    transition: 1s;

  }

  .stepper-item-title {
    color: #32CD32;
  }
}

.stepper-pane {

  color: black;
  text-align: left;
  padding-top: 16px;
  padding-left: 400px;
  height: 610px;


}

.controls {
  display: flex;
  margin-left: 30px;
}

.btn {
  display: flex;

  justify-content: center;
  align-items: center;
  padding: 3px 12px;

  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  line-height: 1.5;
  transition: all 150ms;
  background-color: transparent;
  font-weight: bold;
  font-size: 25px;
  color: #32CD32;
  border: none;


  &:disabled {
    opacity: 0.6;
    pointer-events: none;

  }

  &--green-1 {
    background-image: linear-gradient(to right, rgb(107, 219, 137), rgb(50, 205, 50));
    border: none;
    border-radius: 6px;
    color: white;
    width: 130px;
    margin-left: 1300px;
  }
}







#finishbtn {
  margin-top: 70px;
  margin-left: 340px;
  background-color: #32CD32;
  width: 130px;

  justify-content: center;
  align-items: center;


  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  line-height: 2;
  border: none;


  color: white;
  font-size: 20px;
}

.title {
  font-weight: bold;
}

.pull {
  margin-top: 50px;
  position: relative;
  background: #fff;
  border: 2px solid #32CD32;
  width: 300px;
  height: 170px;
  padding: 10px 20px;
}

.pull:after,
.pull:before {
  right: 100%;
  top: 50%;
  border: solid transparent;
  content: "";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.pull:after {
  border-color: rgba(255, 255, 255, 0);
  border-right-color: #fff;
  border-width: 50px;
  margin-top: -50px;
}

.pull:before {
  border-color: rgba(194, 225, 245, 0);
  border-right-color: #32CD32;
  border-width: 53px;
  margin-top: -53px;
}

.addinput {
  width: 350px;
  margin-top: 10px;
  border: none;
  height: 35px;
}
[type=checkbox] {
	width: 20px;
	height: 20px;
	vertical-align: middle;
	margin-right: 3px;
}

[type=radio] {
	width: 15px;
	height: 15px;
	vertical-align: middle;
	margin-right: 3px;
}
.image {
  width: 300px;
  display: flex;
}

.margin1 {
  margin-top: 20px;
}

.margin2 {
  margin-top: 10px;
  border:none;
  height: 35px;
}

input {
  border: 1px solid grey;
  height: 35px;
  background-color: rgb(242, 242, 242);
}

select {
  border: 1px solid grey;
  height: 35px;

  background-color: rgb(242, 242, 242);
}

.addtitle {
  text-align: left;
  border-bottom: 1px solid grey;
  width: 1500px;
  margin-left: 50px;
  margin-top: 48px;
  height: 30px;
  font-size: 25px;
}

input[type=radio] {
  vertical-align: middle;
  margin-right: 10px;
}

input[type=checkbox] {
  text-align: center;

}

.radio {
  margin-right: 20px;
}

.eventcol {
  font-size: 20px;
}

tr {
  height: 30px;
}

tr :nth-child(2) {
  text-align: center;
}

tr :nth-child(3) {
  text-align: center;
}


#checkicon {
  font-size: 150px;
  color: #00C9B9;
}

#sucessspan {
  font-size: 50px;
  color: #00C9B9;
  margin-left: 130px;
}

.adduser{
  cursor: pointer;
}
</style>