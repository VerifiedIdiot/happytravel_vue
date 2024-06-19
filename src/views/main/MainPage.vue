<template>
    <div class="main-page-container">
      <div class="main-content">
        <div class="card-container">
          <div class="card">인사/급여1</div>
          <div class="card">인사/급여3</div>
          <div class="card">회계/총무1</div>
          <div class="card">영업관리1</div>
          <div class="card">회계/총무2</div>
        </div>
        <div class="link-section">
          <div class="link-category">
            <h3 class="category-title">인사/급여</h3>
            <div class="links">
              <router-link to="/hr/subpage1">인사/급여1</router-link>
              <router-link to="/hr/subpage2">인사/급여2</router-link>
              <router-link to="/hr/subpage3">인사/급여3</router-link>
              <router-link to="/hr/subpage4">인사/급여4</router-link>
              <router-link to="/hr/subpage5">인사/급여5</router-link>
            </div>
          </div>
          <div class="link-category">
            <h3 class="category-title">회계/총무</h3>
            <div class="links">
              <router-link to="/accounting/subpage1">회계/총무1</router-link>
              <router-link to="/accounting/subpage2">회계/총무2</router-link>
              <router-link to="/accounting/subpage3">회계/총무3</router-link>
              <router-link to="/accounting/subpage4">회계/총무4</router-link>
              <router-link to="/accounting/subpage5">회계/총무5</router-link>
            </div>
          </div>
          <div class="link-category">
            <h3 class="category-title">영업관리</h3>
            <div class="links">
                <router-link to="/sales/subpage1">영업관리1</router-link>
                <router-link to="/sales/subpage2">영업관리2</router-link>
                <router-link to="/sales/subpage3">영업관리3</router-link>
                <router-link to="/sales/subpage4">영업관리4</router-link>
                <router-link to="/sales/subpage5">영업관리5</router-link>
          </div>
        </div>
      </div>
      <div class="notice-section">
        <h3>공지사항</h3>
        <div class="notice-content">
          <!-- 공지사항 내용 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
};
</script>

<style scoped>
.main-page-container {
  padding: 20px;
}

.card-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.card {
  width: 100px;
  height: 100px;
  background-color: lightgrey;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.9em;
  text-align: center;
}

.link-section {
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 5px;
}

.link-category {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.category-title {
  font-weight: bold;
  color: #333;
  margin-right: 20px;
  width: 80px; /* Fixed width to align titles vertically */
}

.links {
  display: flex;
  flex-wrap: wrap;
}

.links router-link {
  margin-right: 20px;
  color: inherit;
  text-decoration: none;
}

.links router-link:hover {
  text-decoration: underline;
}

.notice-section {
  margin-top: 20px;
}

.notice-section h3 {
  display: flex;
  align-items: center;
  margin: 0;
}

.notice-section h3::after {
  content: '+';
  margin-left: 5px;
  font-size: 1.2em;
  cursor: pointer;
}

.notice-content {
  background-color: lightgrey;
  padding: 10px;
  border-radius: 5px;
  min-height: 100px;
}
</style>
  