import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

export const orderSlugs = [
  'popularity',
  'vote_average',
  'original_title',
  'release_date',
]

const OrderSelector = ({ selectedOrder = orderSlugs[0], setSelectedOrder }) => {
  return (
    <FormControl variant="outlined">
      <InputLabel>Order</InputLabel>
      <Select
        value={selectedOrder}
        onChange={(e) => setSelectedOrder(e.target.value)}
        label="order"
      >
        {orderSlugs.map((slug) => (
          <MenuItem value={slug} className="capitalize">
            {slug.charAt(0).toUpperCase() + slug.replace('_', ' ').slice(1)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
export default OrderSelector
