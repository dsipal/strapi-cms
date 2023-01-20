import React, { useState, useEffect} from 'react'
import { Grid, GridItem } from '@strapi/design-system/Grid'
import { Box } from '@strapi/design-system/Box'
import { Searchbar, SearchForm } from '@strapi/design-system'
import { Tooltip } from '@strapi/design-system/Tooltip'
import { Typography } from '@strapi/design-system/Typography'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { set } from 'lodash'
import { useIntl } from 'react-intl';
import {useQueryParams } from '@strapi/helper-plugin';

config.autoAddCss = false
library.add(fas)



const Field = ({
    name,
    onChange,
    required
}) => {
  const [{ query, rawQuery }] = useQueryParams();
  const [value, setValue] = useState(query && query._q ? query._q : '');
  const { formatMessage } = useIntl();
  const iconsArray = Object.keys(fas)
  .filter(icon => {
    if (icon.includes(value)) {
      return true
    }
    //return icon
  }).sort()

  const handleClear = () => {
    setValue('');
  };

  const handleChange = (n, v) => {
    const nextValue = set(value, n, v);
    onChange({target: {name, value: JSON.stringify(nextValue), type: 'json'}})
  }

  return (
    <>
      <Box paddingBottom={8}>
        <SearchForm>
          <Box>
            <Typography paddingBottom={9}>Icons</Typography>
          </Box>
          <Searchbar
          name="icon-search"
          value={value}
          clearLabel={formatMessage({ id: 'clearLabel', defaultMessage: 'Clear'})}
          onChange = {e => setValue(e.target.value)}
          onClear={handleClear}
          placeholder="Search"
          required={required}
          >
            Search
          </Searchbar>
        </SearchForm>
      </Box>

      <Box height="200px" overflow="scroll">
        <Grid>
          {iconsArray.map(icon => {
            return (
              <GridItem
              padding={2}
              col={2}
              key={icon}
              background={'neutral0'}>
                <Box
                    onClick={(e) => { setValue(icon)
                      // const arg = {
                      //   target: {
                      //     name,
                      //     value: icon
                      //   }
                      // }
                      // console.log(arg)
                      // onChange(arg)
                    }}>
                      <FontAwesomeIcon icon={fas[icon]} />
                    </Box>
              </GridItem>
            )
          })}
        </Grid>
      </Box>
    </>
  )
}
export default Field