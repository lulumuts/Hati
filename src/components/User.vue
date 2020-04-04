<template>
<div>
       <b-input type="text" v-model="searchQuery" placeholder="Search"></b-input>
                   <div v-for="item in resultQuery">
                  <b-card
                    class="users"
                  >
                    <h6>{{item.firstName}} {{item.lastName}}</h6>
                    <p><span class="title">Facility:</span> {{item.facilityName}}</p>
                    <p><span class="title">Address:</span> {{item.facilityAddress}}</p>
                  </b-card>
                </div>
</div>
</template>