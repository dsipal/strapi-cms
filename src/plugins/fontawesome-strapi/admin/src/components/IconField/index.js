import React from 'react'
import { Grid, GridItem } from '@strapi/design-system/Grid'
import { Box } from '@strapi/design-system/Box'
import { Searchbar, SearchForm } from '@strapi/design-system'
import { Typography } from '@strapi/design-system/Typography'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useIntl } from 'react-intl';

config.autoAddCss = false
library.add(fas)

const Field = ({
    name,
    onChange,
    required,
    value
}) => {
  const { formatMessage } = useIntl();
  const iconsArray = Object.keys(fas)
  .filter(icon => {
    if (icon.includes(value)) {
      return icon
    }
  }).sort()

  const handleChange = (e, newValue) => {
    onChange({target: { name, value: e.target.value || newValue, type: "string"}})
  }

  return (
    <>
      <Box paddingBottom={8}>
        <SearchForm>
          <Box>
            <Typography>Currently Selected Icon: </Typography>
            <FontAwesomeIcon icon={fas[value]} size="2x" inverse></FontAwesomeIcon>
          </Box>
          <Searchbar
          name="icon-search"
          value={value}
          clearLabel={formatMessage({ id: 'clearLabel', defaultMessage: 'Clear'})}
          onChange = {e => handleChange(e)}
          onClear={e => handleChange(e, '')}
          placeholder="Search"
          required={required}
          >
            Search
          </Searchbar>
        </SearchForm>
      </Box>

      <Box height="200px" overflow="scroll" background={'neutral0'}>
        <Grid>
          {iconsArray.map(icon => {
            return (
              <GridItem
              padding={2}
              col={2}
              key={icon}>
                <Box
                    onClick={(e) => handleChange(e, icon)}>
                      <FontAwesomeIcon icon={fas[icon]} inverse/>
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