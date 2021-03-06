export default { 
  data() {
    return {
      size_group_filters: [],
      sector_filters: [],
      seniority_filters: [],
      role_filters: [],
      q: this.$route.query.q || '',
      type: this.$route.query.type || '',
      size_group: this.$route.query.size_group || '',
      sector_id: this.$route.query.sector_id || '',
      seniority: this.$route.query.seniority || '',
      recipient_role_id: this.$route.query.recipient_role_id || '',
      sort: this.$route.query.sort || '',
      view: this.$route.query.view || 'card',
      survey_id: this.$route.query.survey_id || null,
    }
  },
  computed: {
    the_query() {
      var query = {}
      if(this.q.length > 0)
        query.q = this.q
      if(this.type.length > 0)
        query.type = this.type
      if(this.size_group.length > 0)
        query.size_group = this.size_group
      if(this.sector_id > 0)
        query.sector_id = this.sector_id
      if(this.seniority.length > 0)
        query.seniority = this.seniority
      if(this.recipient_role_id > 0)
        query.recipient_role_id = this.recipient_role_id
      if(this.sort.length > 0)
        query.sort = this.sort
      if(this.view.length > 0)
        query.view = this.view
      if(this.survey_id > 0)
        query.survey_id = this.survey_id
      
      return query 
    },
    the_size_group_filters() {
      return [{ value: '', text: 'Company Size' }, ...this.size_group_filters]
    },
    the_sector_filters() {
      return [{ value: '', text: 'Industry' }, ...this.sector_filters]
    },
    the_seniority_filters() {
      return [{ value: '', text: 'Seniority' }, ...this.seniority_filters]
    },
    the_role_filters() {
      return [{ value: '', text: 'Role' }, ...this.role_filters]
    },
  },
  methods: {
    resetFilters() {
      this.q = ''
      this.type = ''
      this.size_group = ''
      this.sector_id = ''
      this.seniority = ''
      this.recipient_role_id = ''
      this.sort = ''
    }
  }
}
