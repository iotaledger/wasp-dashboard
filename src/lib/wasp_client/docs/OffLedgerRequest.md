# OffLedgerRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**ChainId** | **string** | The chain id | 
**Request** | **string** | Offledger Request (Hex) | 

## Methods

### NewOffLedgerRequest

`func NewOffLedgerRequest(chainId string, request string, ) *OffLedgerRequest`

NewOffLedgerRequest instantiates a new OffLedgerRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewOffLedgerRequestWithDefaults

`func NewOffLedgerRequestWithDefaults() *OffLedgerRequest`

NewOffLedgerRequestWithDefaults instantiates a new OffLedgerRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetChainId

`func (o *OffLedgerRequest) GetChainId() string`

GetChainId returns the ChainId field if non-nil, zero value otherwise.

### GetChainIdOk

`func (o *OffLedgerRequest) GetChainIdOk() (*string, bool)`

GetChainIdOk returns a tuple with the ChainId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetChainId

`func (o *OffLedgerRequest) SetChainId(v string)`

SetChainId sets ChainId field to given value.


### GetRequest

`func (o *OffLedgerRequest) GetRequest() string`

GetRequest returns the Request field if non-nil, zero value otherwise.

### GetRequestOk

`func (o *OffLedgerRequest) GetRequestOk() (*string, bool)`

GetRequestOk returns a tuple with the Request field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRequest

`func (o *OffLedgerRequest) SetRequest(v string)`

SetRequest sets Request field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


