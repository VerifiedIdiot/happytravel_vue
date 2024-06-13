<template>
  <header class="header-upper">
    <div class="header-container">
      <div class="header-box logo-box">
        <router-link to="/" class="logo-link">
          <img src="@/assets/img/logo-temp.png" alt="Logo" class="logo" />
        </router-link>
      </div>
      <div class="header-box status-box">
        <h1 class="status-text">{{ someVar }} 님</h1>
        <router-link to="/mypage">
          <img
            src="@/assets/img/pepe.png"
            alt="Profile-img"
            class="profile-img"
          />
        </router-link>
      </div>
    </div>
  </header>
  <header class="header-under">
    <div class="header-box nav-box">
      <nav>
        <ul class="nav-list">
          <li
            @mouseenter="toggleDropdown('hr')"
            @mouseleave="toggleDropdown(null)"
          >
            <router-link to="/hr" class="nav-link">인사/급여</router-link>
            <div v-if="dropdown === 'hr'" class="dropdown-content">
              <router-link to="/salary/data">급여 내역</router-link>
              <router-link to="/salary/payment">급여 지급 내역</router-link>
            </div>
          </li>
          <li
            @mouseenter="toggleDropdown('accounting')"
            @mouseleave="toggleDropdown(null)"
          >
            <router-link to="/accounting" class="nav-link"
              >회계/총무</router-link
            >
            <div v-if="dropdown === 'accounting'" class="dropdown-content">
              <router-link to="/accounting/subpage1">페이지 1</router-link>
              <router-link to="/accounting/subpage2">페이지 2</router-link>
            </div>
          </li>
          <li
            @mouseenter="toggleDropdown('sales')"
            @mouseleave="toggleDropdown(null)"
          >
            <router-link to="/sales" class="nav-link">영업관리</router-link>
            <div v-if="dropdown === 'sales'" class="dropdown-content">
              <router-link to="/sales/partner">협력사관리</router-link>
              <router-link to="/sales/package">여행상품관리</router-link>
            </div>
          </li>
          <li @mouseenter="toggleDropdown('attendance')" @mouseleave="toggleDropdown(null)">
            <router-link to="/attendance" class="nav-link">근태 테스트</router-link>
            <div v-if="dropdown === 'attendance'" class="dropdown-content">
              <router-link to="/attendance/myAttendance">나의 근테</router-link>
              <router-link to="/attendance/teamAttendance">팀원 근태</router-link>
              <router-link to="/attendance/adminAttendance">근태 관리</router-link>
            </div>
          </li>
          
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      someVar: "pepe",
      dropdown: null,
    };
  },
  methods: {
    toggleDropdown(menu) {
      this.dropdown = menu;
    },
  },
};
</script>

<style src="./header.css"></style>
