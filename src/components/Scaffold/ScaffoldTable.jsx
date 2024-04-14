export default defineComponent({
  name: 'ScaffoldTable',
  props: {
    height: {
      type: Number,
      default: 100
    },
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    return () => {
      return (
        <el-table data={props.data} height={`${props.height}px`}>
          {props.columns.map((column) => (
            <el-table-column {...column} />
          ))}
        </el-table>
      )
    }
  }
})
