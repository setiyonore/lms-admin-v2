<template>
  <div>
    <div class="modal-body">
      <div class="row">
        <div class="col-md-6">
          <img
            class="img-fluid rounded shadow mb-3"
            :src="book.img_url_cover"
            alt="Cover image"
          />
        </div>
        <div class="col-md-6">
          <h5>Details</h5>
          <p><strong>ISBN:</strong> {{ book.isbn }}</p>
          <p>
            <strong>Year of Publication:</strong>
            {{ book.year_of_publication }}
          </p>
          <p><strong>Author:</strong> {{ book.author }}</p>
          <p><strong>Publisher:</strong> {{ book.publiser }}</p>
        </div>
      </div>
      <div class="row mt-1">
        <div class="col-12">
          <div class="description-text" v-html="book.description"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    book: Object,
  },
};
</script>
