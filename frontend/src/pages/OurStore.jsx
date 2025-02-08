import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";
import {
  MenuItem,
  Select,
  TextField,
  Chip,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const OurStore = () => {
  const [grid, setGrid] = useState(2);
  const dispatch = useDispatch();
  const productState = useSelector((state) => Array.isArray(state?.product?.product) ? state?.product?.product : []);

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [colors, setColors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    tag: "",
    color: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    let newBrands = new Set();
    let newCategories = new Set();
    let newTags = new Set();
    let newColors = new Set();

    productState.forEach((product) => {
      newBrands.add(product.brand);
      newCategories.add(product.category);
      product.tags?.forEach((tag) => newTags.add(tag));
      product.color?.forEach((col) => newColors.add(col));
    });

    setBrands([...newBrands]);
    setCategories([...newCategories]);
    setTags([...newTags]);
    setColors([...newColors]);
  }, [productState]);

  useEffect(() => {
    dispatch(getAllProducts(filters)).then((response) => {
      setTotalPages(response?.payload?.totalPages || 1);
    });
  }, [filters, dispatch]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      brand: "",
      tag: "",
      color: "",
      minPrice: "",
      maxPrice: "",
      sort: "",
      page: 1,
      limit: 10,
    });
  };

  return (
    <div className="container mx-auto py-5 px-4">
      <h1 className="text-3xl font-bold mb-5">Our Store</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Sidebar Filters (Collapsible on Mobile) */}
        <div className="space-y-5">
          {["Shop By Categories", "Filter By Brand", "Price", "Tags"].map((title, i) => (
            <Accordion key={i}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h3 className="font-semibold">{title}</h3>
              </AccordionSummary>
              <AccordionDetails>
                {title === "Shop By Categories" && (
                  <ul className="space-y-2">
                    <li className="cursor-pointer" onClick={() => handleFilterChange("category", "")}>All</li>
                    {categories.map((cat, index) => (
                      <li key={index} className="cursor-pointer" onClick={() => handleFilterChange("category", cat)}>
                        {cat}
                      </li>
                    ))}
                  </ul>
                )}
                {title === "Filter By Brand" && (
                  <ul className="space-y-2">
                    <li className="cursor-pointer" onClick={() => handleFilterChange("brand", "")}>All</li>
                    {brands.map((brand, index) => (
                      <li key={index} className="cursor-pointer" onClick={() => handleFilterChange("brand", brand)}>
                        {brand}
                      </li>
                    ))}
                  </ul>
                )}
                {title === "Price" && (
                  <div className="flex gap-2">
                    <TextField label="From" type="number" value={filters.minPrice} onChange={(e) => handleFilterChange("minPrice", e.target.value)} />
                    <TextField label="To" type="number" value={filters.maxPrice} onChange={(e) => handleFilterChange("maxPrice", e.target.value)} />
                  </div>
                )}
                {title === "Tags" && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Chip key={index} label={tag} onClick={() => handleFilterChange("tag", tag)} />
                    ))}
                  </div>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
          <Button variant="outlined" fullWidth onClick={clearFilters}>Clear Filters</Button>
        </div>

        {/* Products Section */}
        <div className="col-span-3">
          {/* Sorting & Grid View */}
          <div className="flex justify-between items-center mb-4">
            <FormControl size="small">
              <InputLabel>Sort By</InputLabel>
              <Select value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value })}>
                <MenuItem value="title">A-Z</MenuItem>
                <MenuItem value="-title">Z-A</MenuItem>
                <MenuItem value="selling_price">Low to High</MenuItem>
                <MenuItem value="-selling_price">High to Low</MenuItem>
              </Select>
            </FormControl>

            <ToggleButtonGroup size="small" value={grid} exclusive onChange={(e, value) => value && setGrid(value)}>
              <ToggleButton value={1}>1</ToggleButton>
              <ToggleButton value={2}>2</ToggleButton>
              <ToggleButton value={3}>3</ToggleButton>
              <ToggleButton value={4}>4</ToggleButton>
            </ToggleButtonGroup>
          </div>
          {/* Product Grid */}
          <div
            className={`grid ${
              grid === 1
                ? "grid-cols-1"
                : grid === 2
                ? "grid-cols-2"
                : grid === 3
                ? "grid-cols-3"
                : "grid-cols-4"
            } gap-4`}
          >
            {productState.map((product, index) => (
              <Link key={index} to={`/product/${product?._id}`}>
                <div className="border p-4 rounded-lg shadow-sm">
                  <img
                    src={product?.images[0]?.url}
                    alt={product.title}
                    className="w-full h-40 object-cover mb-2"
                  />
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="text-gray-600">₹{product.selling_price}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-5">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => {
                setPage(value);
                setFilters((prev) => ({ ...prev, page: value }));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStore;
